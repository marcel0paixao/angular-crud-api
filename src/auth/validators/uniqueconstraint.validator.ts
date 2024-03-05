// unique.validator.ts
import { PrismaClient } from '@prisma/client';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { CreateProductDto } from 'src/products/dto/create-product.dto';

const prisma = new PrismaClient();

@ValidatorConstraint({ async: true })
export class UniqueConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const [model, field, perUser] = args.constraints;
    const object = args.object as CreateProductDto | CreateCategoryDto;
    const user_id = object.user_id;

    //@ts-ignore
    //necessary due the prisma typing compilation error
    const existingRecord = await prisma[model].findFirst({
      where: {
        [field]: value,
        ...(perUser && { user_id }),
      },
    });
    
    if (perUser && existingRecord && object.id && existingRecord.id == object.id) return true;

    return !existingRecord;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be unique.`;
  }
}

export function Unique(
  model: string,
  field: string,
  perUser: boolean,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'Unique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [model, field, perUser],
      options: validationOptions,
      validator: UniqueConstraint,
    });
  };
}

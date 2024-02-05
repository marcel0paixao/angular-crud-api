// unique.validator.ts
import { PrismaClient } from '@prisma/client';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

const prisma = new PrismaClient();

@ValidatorConstraint({ async: true })
export class UniqueConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const [model, field] = args.constraints;

    //@ts-ignore
    //necessary due the prisma typing compilation error
    const existingRecord = await prisma[model].findUnique({
      where: { [field]: value },
    });
    
    return !existingRecord;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be unique.`;
  }
}

export function Unique(
  model: string,
  field: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'Unique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [model, field],
      options: validationOptions,
      validator: UniqueConstraint,
    });
  };
}

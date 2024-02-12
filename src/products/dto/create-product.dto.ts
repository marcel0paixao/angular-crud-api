import { IsNotEmpty, IsNumber, IsString, MaxLength, Min, IsInt } from "class-validator"
import { Unique } from "src/auth/validators/uniqueconstraint.validator"

export class CreateProductDto {
    id: number

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    @Unique('product', 'name', true, {
        message: 'field must be unique'
    })
    name: string

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    @Min(1)
    price: number

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    category_id: number

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    user_id: number
}

import { IsNotEmpty, IsNumber, IsString, MaxLength, Min, IsInt } from "class-validator"

export class CreateProductDto {
    id: number

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    price: number

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    category_id: number
}

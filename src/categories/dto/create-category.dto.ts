import { IsNotEmpty, IsString, MaxLength, Min, MinLength, isNotEmpty } from "class-validator";

export class CreateCategoryDto {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    name: string;
}

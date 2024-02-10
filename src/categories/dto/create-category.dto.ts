import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    name: string;
}

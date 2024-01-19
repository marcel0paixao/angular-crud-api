import { IsNotEmpty, IsString, MaxLength, isNotEmpty } from "class-validator";

export class CreateCategoryDto {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;
}

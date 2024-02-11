import { IsInt, IsNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateCategoryDto {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    name: string;

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    user_id: number
}

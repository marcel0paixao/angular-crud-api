import { IsInt, IsNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator";
import { Unique } from "src/auth/validators/uniqueconstraint.validator";

export class CreateCategoryDto {
    id: number

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @Unique('category', 'name', true, {
        message: 'field must be unique'
    })
    name: string;

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    user_id: number
}

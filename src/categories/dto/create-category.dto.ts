import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  name: string;
}

import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator"

export class CreateJobDto {
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  title

  @IsNotEmpty()
  @IsString()
  description

  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  company

  @Min(1)
  @IsNotEmpty()
  @IsNumber()
  categoryId

  @IsNotEmpty()
  @IsString()
  applyLink;

  @IsString()
  logo;

  createdById?: number;
}


import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";

export class SignUpDto {
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  name: string

  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @MaxLength(255)
  @MinLength(4)
  @IsNotEmpty()
  @IsString()
  password: string
}
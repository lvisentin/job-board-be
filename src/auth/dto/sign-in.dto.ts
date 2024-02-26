import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SignInDto {
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
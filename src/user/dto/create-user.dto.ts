import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  name: string;

  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @MaxLength(255)
  @Min(4)
  @IsNotEmpty()
  @IsString()
  password: string;
}

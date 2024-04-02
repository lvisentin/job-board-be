import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateJobDumpDto {
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  title;

  @IsNotEmpty()
  @IsString()
  description;

  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  company;

  @IsNotEmpty()
  @IsString()
  applyLink;

  @IsString()
  logo;

  createdById?: number;
}

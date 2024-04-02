import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateJobApplicationDto {
  @Min(0)
  @IsNotEmpty()
  @IsNumber()
  jobId: number;

  @Min(0)
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

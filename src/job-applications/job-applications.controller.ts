import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';

@Controller('job-applications')
export class JobApplicationsController {
  constructor(
    private readonly jobApplicationsService: JobApplicationsService,
  ) {}

  @Post()
  create(@Body() createJobApplicationDto: CreateJobApplicationDto) {
    console.log(createJobApplicationDto);
    return this.jobApplicationsService.create(createJobApplicationDto);
  }

  @Get()
  findAll() {
    return this.jobApplicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.jobApplicationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateJobApplicationDto: UpdateJobApplicationDto,
  ) {
    return this.jobApplicationsService.update(id, updateJobApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.jobApplicationsService.remove(id);
  }

  @Get('job/:jobId')
  findApplicantsCountByJob(@Param('jobId', new ParseIntPipe()) id: number) {
    return this.jobApplicationsService.getApplicantsByJob(id);
  }

  @Get('user/:userId')
  findApplicationsByUser(@Param('userId', new ParseIntPipe()) userId: number) {
    return this.jobApplicationsService.getApplicationsByUser(userId);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Public } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';


@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Post()
  @Roles(Role.Admin)
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Post('dump')
  @Roles(Role.Admin)
  createMany(@Body() createJobDto: CreateJobDto[]) {
    return this.jobsService.createMultiple(createJobDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get('user/:id')
  findJobsByUser(@Param('id', new ParseIntPipe()) id: number) {
    return this.jobsService.getByUser(id);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.jobsService.remove(id);
  }
}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { Public } from 'src/auth/auth.guard';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobsService } from './jobs.service';
import { Request } from 'express';


@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Post('rok')
  @Public()
  getRok() {
    return this.jobsService.getJobsFromRemoteOK();
  }

  @Post()
  @Roles(Role.Admin)
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Post('dump')
  @Roles(Role.Admin)
  createMany(@Req() request: Request, @Body() createJobDto: CreateJobDto[]) {
    console.log('creatmany')
    return this.jobsService.createMultiple((createJobDto as any).jobs, request);
  }

  @Get()
  @Public()
  findAll() {
    console.log('find all')
    return this.jobsService.findAll();
  }

  @Get('search')
  @Public()
  search(@Query('search') search: string) {
    return this.jobsService.search(search)
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

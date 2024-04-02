import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { take } from 'rxjs';

@Injectable()
export class JobsService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  getJobsFromRemoteWWR() {
    console.log('Getting Jobs from WWR');
    this.httpService
      .post<CreateJobDto[]>(
        `https://uolblavtiyb2ugq6ocvhaphsxm0bkbfs.lambda-url.us-east-2.on.aws/`,
      )
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          const customIds = res.data.map((j) => j.customId);
          console.log(customIds);
          this.createMultiple(res.data, { user: { userId: 1 } } as any);
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => console.log('Finally WWR'),
      });
  }

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  getJobsFromRemoteOK() {
    console.log('Getting Jobs from ROK');
    this.httpService
      .post<CreateJobDto[]>(
        `https://lqpebweraqrf5hfaznu3jsccti0iekjs.lambda-url.us-east-2.on.aws/`,
      )
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.createMultiple(res.data, { user: { userId: 1 } } as any);
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => console.log('Finally ROK'),
      });
  }

  create(createJobDto: CreateJobDto) {
    return this.prisma.job.create({ data: createJobDto });
  }

  findAll() {
    return this.prisma.job.findMany({
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });
  }

  search(search: string) {
    return this.prisma.job.findMany({
      where: {
        title: {
          contains: search,
        },
      },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.job.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return this.prisma.job.update({ where: { id }, data: updateJobDto });
  }

  remove(id: number) {
    return this.prisma.job.delete({ where: { id } });
  }

  getByUser(userId: number) {
    return this.prisma.job.findMany({
      where: {
        createdById: userId,
      },
      include: {
        // categories: true,
        _count: {
          select: { applications: true },
        },
      },
    });
  }

  async createMultiple(jobs: CreateJobDto[], req: any) {
    const existingJobs = (
      await this.prisma.job.findMany({
        where: {
          customId: {
            in: jobs.map((j) => j.customId),
          },
        },
      })
    ).map((j) => j.customId);

    const filteredJobs: CreateJobDto[] = jobs.filter(
      (job) => !existingJobs.includes(job.customId),
    );
    if (!filteredJobs.length) {
      return { count: 0 };
    }

    return await this.prisma.job.createMany({
      data: filteredJobs.map((j) => ({ ...j, createdById: req.user.userId })),
    });
  }
}

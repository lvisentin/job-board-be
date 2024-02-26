import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) { }

  create(createJobDto: CreateJobDto) {
    return this.prisma.job.create({ data: createJobDto })
  }

  findAll() {
    return this.prisma.job.findMany({
      include: {
        category: true,
        _count: {
          select: { applications: true }
        }
      }
    })
  }

  findOne(id: number) {
    return this.prisma.job.findUniqueOrThrow({ where: { id } })
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return this.prisma.job.update({ where: { id }, data: updateJobDto });
  }

  remove(id: number) {
    return this.prisma.job.delete({ where: { id } })
  }

  getByUser(userId: number) {
    return this.prisma.job.findMany({
      where: {
        createdById: userId,
      },
      include: {
        category: true,
        _count: {
          select: { applications: true }
        }
      }
    })
  }

  createMultiple(jobs: CreateJobDto[]) {
    return this.prisma.job.createMany({ data: jobs })
  }
}

import { Injectable } from '@nestjs/common';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobApplicationsService {
  constructor(private prisma: PrismaService) { }

  create(createJobApplicationDto: CreateJobApplicationDto) {
    return this.prisma.jobApplication.create({ data: createJobApplicationDto });
  }

  findAll() {
    return this.prisma.jobApplication.findMany();
  }

  findOne(id: number) {
    return this.prisma.jobApplication.findUniqueOrThrow({ where: { id } })
  }

  update(id: number, updateJobApplicationDto: UpdateJobApplicationDto) {
    return this.prisma.jobApplication.update({ where: { id }, data: updateJobApplicationDto })
  }

  remove(id: number) {
    return this.prisma.jobApplication.delete({ where: { id } })
  }

  getApplicantsByJob(jobId: number) {
    return this.prisma.jobApplication.findMany({
      where: {
        jobId
      }
    })
  }

  getApplicationsByUser(userId: number) {
    return this.prisma.jobApplication.findMany({
      where: {
        userId
      },
      include: {
        job: {
          include: {
            category: true
          }
        },

      }
    })
  }
}

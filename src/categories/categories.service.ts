import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }

  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.jobCategory.create({ data: createCategoryDto });
  }

  findAll() {
    return this.prisma.jobCategory.findMany();
  }

  findOne(id: number) {
    return this.prisma.jobCategory.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.jobCategory.update({ where: { id }, data: updateCategoryDto });
  }

  remove(id: number) {
    return this.prisma.jobCategory.delete({ where: { id } });
  }
}

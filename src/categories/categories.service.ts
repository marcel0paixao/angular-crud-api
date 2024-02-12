import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class CategoriesService {

  constructor(private prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto
    })
  }

  findAll(user: User) {
    return this.prisma.category.findMany({
      where: {
        user_id: user.id
      },
      orderBy: {
        created_at: 'desc'
      }
    })
  }

  findOne(id: number, user: User) {
    return this.prisma.category.findUniqueOrThrow({
      where: {
        id,
        user_id: user.id
      }
    })
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto, user: User) {
    return this.prisma.category.update({
      where: {
        id,
        user_id: user.id
      }, 
      data: updateCategoryDto
    })
  }

  remove(id: number, user: User) {
    return this.prisma.category.delete({
      where: {
        id,
        user_id: user.id
      }
    })
  }
}

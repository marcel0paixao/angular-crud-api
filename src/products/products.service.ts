import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Injectable()
export class ProductsService {

  constructor(private prisma: PrismaService) {}

  create(CreateProductDto: CreateProductDto) {
    CreateProductDto.name = CreateProductDto.name.trim();

    return this.prisma.product.create({
      data: CreateProductDto
    })
  }

  findAll(user: User) {
    return this.prisma.product.findMany({
      where: {
        user_id: user.id
      },
      orderBy: {
        created_at: 'desc'
      }
    })
  }

  findOne(id: number, user: User) {
    return this.prisma.product.findUniqueOrThrow({
      where: {
        id,
        user_id: user.id
      }
    })
  }

  update(id: number, UpdateProductDto: UpdateProductDto, user: User) {
    UpdateProductDto.name = UpdateProductDto.name.trim();
    
    return this.prisma.product.update({
      where: {
        id,
        user_id: user.id
      }, 
      data: UpdateProductDto
    })
  }

  remove(id: number, user: User) {
    return this.prisma.product.delete({
      where: {
        id,
        user_id: user.id
      }
    })
  }
}

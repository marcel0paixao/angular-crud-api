import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {

  constructor(private prisma: PrismaService) {}

  create(CreateProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: CreateProductDto
    })
  }

  findAll() {
    return this.prisma.product.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })
  }

  findOne(id: number) {
    return this.prisma.product.findUniqueOrThrow({
      where: {
        id,
      }
    })
  }

  update(id: number, UpdateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: {
        id
      }, 
      data: UpdateProductDto
    })
  }

  remove(id: number) {
    return this.prisma.product.delete({
      where: {
        id
      }
    })
  }
}

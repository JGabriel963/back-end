import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { BookDTO } from './book.dto';

@Injectable()
export class BookService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async create({ title, description, bar_code }: BookDTO) {
    const bookExists = await this.prisma.book.findFirst({
      where: {
        bar_code
      }
    })

    if (bookExists) {
      throw new BadRequestException("Book already exists");
    }

    const book = await this.prisma.book.create({
      data: {
        title,
        description,
        bar_code
      }
    });

    return book
  }

  async findAll(page: number) {

    let skip: number = 0

    if (page > 0) {
      skip = ((page + 1) - 1) * 4
    }

    return await this.prisma.book.findMany({
      skip,
      take: 4, 
      orderBy: {
        created_at: 'asc'
      }
    })
  }

  async update(id: string, data: BookDTO) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id
      }
    })

    if(!bookExists) {
      throw new NotFoundException("Book does not exists!")
    }

    return await this.prisma.book.update({
      data,
      where: {
        id
      }
    })
  }

  async delete(id: string) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id
      }
    })

    if(!bookExists) {
      throw new NotFoundException('Book does not exists!')
    }

    return await this.prisma.book.delete({
      where: {
        id,
      }
    })
  }
}

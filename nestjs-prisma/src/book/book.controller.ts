import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from './book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('')
  async create(@Body() data: BookDTO) {
    return this.bookService.create(data)
  }

  @Get()
  async find(@Query('page') _page: string) {
    const page = parseInt(_page)
    return this.bookService.findAll(page)
  }




  // http://localhost:3333/2238434384
  @Put(":id")
  async update(@Param("id") id: string, @Body() data: BookDTO) {
    return this.bookService.update(id, data)
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.bookService.delete(id)
  }
}

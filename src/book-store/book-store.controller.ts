import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { BookStoreService } from './book-store.service';
import { BookStoreDto } from './dto/book-store.dto';
import { AuthGuard } from 'src/guards/authGuard.guard';
import { UpdateUser } from './dto/update.book-store';

import { UserEntity } from 'src/user/user.entity';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
@Controller('bookstore')
export class BookStoreController {
  constructor(private bookService: BookStoreService) {}
  @Post()
  @UseGuards(AuthGuard)
  createBookStore(@Body() body: BookStoreDto, @CurrentUser() user: UserEntity) {
    const book = this.bookService.create(body, user);
    return book;
  }
  @Get()
  findAllBook() {
    const book = this.bookService.findAll();
    return book;
  }
  @Patch('/:id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() body: UpdateUser) {
    const book = this.bookService.update(parseInt(id), body);
    return book;
  }
  @Delete('/:id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    this.bookService.delete(parseInt(id));
  }
}

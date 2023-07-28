import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookstoreEntity } from './book-Store.entity';
import { BookStoreDto } from './dto/book-store.dto';
import { UserEntity } from 'src/user/user.entity';
@Injectable()
export class BookStoreService {
  constructor(
    @InjectRepository(BookstoreEntity)
    private repo: Repository<BookstoreEntity>,
  ) {}
  create(bookDto: BookStoreDto, user: UserEntity) {
    const book = this.repo.create(bookDto);
    book.user = user;
    return this.repo.save(book);
  }
  find(description: string) {
    const book = this.repo.find({
      where: {
        description,
      },
    });
    if (!book) throw new NotFoundException('book not found ');
    return book;
  }
  findAll() {
    const book = this.repo.find();
    return book;
  }
  findone(id: number) {
    const book = this.repo.findOne({
      where: {
        id,
      },
    });
    if (!book) throw new NotFoundException(`book with id ${id} not found`);
    return book;
  }

  async update(id: number, attr: Partial<BookstoreEntity>) {
    const book = await this.findone(id);
    if (!book) throw new NotFoundException(`book with ${id} does not exist`);
    Object.assign(book, attr);
    return this.repo.save(book);
  }

  async delete(id: number) {
    const book = await this.findone(id);
    if (!book) throw new NotFoundException(`book with id ${id} does not exist`);
    return this.repo.remove(book);
  }
}

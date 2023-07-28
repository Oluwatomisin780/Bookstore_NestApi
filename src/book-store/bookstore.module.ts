import { Module } from '@nestjs/common';
import { BookStoreController } from './book-store.controller';
import { BookStoreService } from './book-store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookstoreEntity } from './book-Store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookstoreEntity])],
  controllers: [BookStoreController],
  providers: [BookStoreService],
})
export class BookstoreModule {}

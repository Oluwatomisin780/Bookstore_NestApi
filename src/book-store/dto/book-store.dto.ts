import { IsString } from 'class-validator';

export class BookStoreDto {
  @IsString()
  bookName: string;
  @IsString()
  description: string;
}

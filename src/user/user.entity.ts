import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BookstoreEntity } from 'src/book-store/book-Store.entity';
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany(() => BookstoreEntity, (bookstore) => bookstore.user)
  books: BookstoreEntity[];
}

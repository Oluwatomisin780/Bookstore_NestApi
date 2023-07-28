import { UserEntity } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
@Entity()
export class BookstoreEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  bookName: string;
  @Column()
  description: string;
  @ManyToOne(() => UserEntity, (user) => user.books)
  user: UserEntity;
}

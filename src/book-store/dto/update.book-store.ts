import { IsString, IsOptional } from 'class-validator';

export class UpdateUser {
  @IsString()
  @IsOptional()
  bookName: string;
  @IsString()
  @IsOptional()
  description: string;
}

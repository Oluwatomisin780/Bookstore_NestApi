import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}
  async create(email: string, password: string) {
    const emailExist = await this.repo.find({
      where: {
        email,
      },
    });
    if (emailExist.length)
      throw new BadRequestException(`This email ${email} is already  in use`);
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    let result = salt + '.' + hash.toString('hex');
    password = result;
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }
  async signin(email: string, password: string) {
    const [user] = await this.find(email);
    if (!user) throw new BadRequestException('Sorry Incorrect Email');
    const [salt, hashedPassword] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (hash.toString('hex') !== hashedPassword)
      throw new BadRequestException('Passwoord not correct,Please check');
    return user;
  }
  findone(id: number) {
    if (!id) return null;
    const user = this.repo.findOne({
      where: {
        id,
      },
    });

    return user;
  }
  find(email: string) {
    const user = this.repo.find({
      where: {
        email,
      },
    });
    if (!user) throw new NotFoundException('user does not exist');
    return user;
  }
}

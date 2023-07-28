import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Session,
  Param,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from 'src/guards/authGuard.guard';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/signup')
  @Serialize(UserDto)
  async signup(@Body() body: CreateUserDto) {
    const user = await this.userService.create(body.email, body.password);
    return user;
  }
  @Get('/whoami')
  @UseGuards(AuthGuard)
  async whoAmI(@CurrentUser() user: UserEntity) {
    return user;
  }
  @Get('/:id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findone(id);
    if (!user) throw new NotFoundException(`user with id: ${id} not found`);
    return user;
  }
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Post('/signin')
  @Serialize(UserDto)
  async signIn(@Body() body: CreateUserDto) {
    const user = await this.userService.signin(body.email, body.password);
    return user;
  }
}

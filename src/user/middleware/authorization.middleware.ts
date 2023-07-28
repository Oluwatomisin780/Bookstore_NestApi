import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserEntity } from '../user.entity';
import { UserService } from '../user.service';

declare global {
  namespace Express {
    interface Request {
      CurrentUser?: UserEntity;
    }
  }
}
@Injectable()
export class Authorization implements NestMiddleware {
  constructor(private usersService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
    if (userId) {
      const user = await this.usersService.findone(userId);
      //add ts ignorer
      req.CurrentUser = user;
    }
    next();
  }
}

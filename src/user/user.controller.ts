import {
  Controller,
  Get,
  Delete,
  Param,
  Post,
  Body,
  Patch
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':username')
  find(@Param('username') username: string) {
    return this.userService.findOne(username);
  }

  @Post()
  create(@Body() req: { user: User }) {
    return this.userService.create(req.user);
  }

  @Patch()
  update(@Body() req: { user: User }) {
    return this.userService.fetch(req.user);
  }

  @Delete(':username')
  delete(@Param('username') username: string) {
    return this.userService.remove(username);
  }
}

import {
  Controller,
  Get,
  Delete,
  Param,
  Post,
  Body,
  Put
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('api')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('users')
  findAll() {
    return this.userService.findAll();
  }

  @Get('user/:username')
  find(@Param('username') username: string) {
    return this.userService.findOne(username);
  }

  @Post('users')
  create(@Body() req: { user: User }) {
    return this.userService.create(req.user);
  }

  @Put('user')
  update(@Body() req: { user: User }) {
    return this.userService.update(req.user);
  }

  @Delete('user/:username')
  delete(@Param('username') username: string) {
    return this.userService.remove(username);
  }
}

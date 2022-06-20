import { Controller, Get, Req, Post, Body, UseGuards } from '@nestjs/common';

import { RequestWithUser } from 'src/constants/interfaces/Request-with-user.interface';
import { LocalAuthGuard } from 'src/user/guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  findAll(@Req() req: RequestWithUser) {
    return this.userService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/protected')
  protectedRoute() {
    return `Ahh, JWT token!`;
  }
}

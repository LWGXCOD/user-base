import {
  Controller,
  Get,
  Body,
  Param,
  UseGuards,
  Query,
  BadRequestException,
  Put,
} from '@nestjs/common';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query('page') pageString: number) {
    const page = +pageString;
    if (!page || page <= 0)
      throw new BadRequestException(`page must be a positive number`);
    return this.userService.findAll(page, 10);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}

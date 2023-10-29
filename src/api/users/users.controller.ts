import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/api/auth/guard/jwt-auth.guard';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = new UserEntity(await this.usersService.findOne(id));

    if (!user) {
      throw new NotFoundException(`No invoice found with id: ${id}`);
    }

    const { name, email } = user;

    return { name, email };
  }
}

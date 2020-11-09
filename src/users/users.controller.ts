import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:email')
  async findByEmail(@Param() email: string) {
    return await this.usersService.findByEmail(email);
  }

}

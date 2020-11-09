import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from 'src/users/dto/login.dto';
import { CreateUsersDto } from 'src/users/dto/create-users.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from "./auth.service"
import { JwtAuthGuard } from './jwt-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) { }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("/register")
  async register(@Body() createUsersDto: CreateUsersDto) {
    return await this.usersService.createUser(createUsersDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  async getProfile(@Request() req) {
    try {
      console.log(req.user.user_id)
      const users = await this.usersService.findById(req.user.user_id);
      delete users.password
      return { data: users, status: "success" }

    } catch (error) {
      return error
    }
  }

}

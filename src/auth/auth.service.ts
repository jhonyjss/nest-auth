import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/users/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOne(loginDto);
    if (!user) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    // generate and sign token    
    const token = this.createTokenJWT(user);
    return {
      user: user, ...token,
    };
  }

  async validateUser(payload: any) {
    const user = await this.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async findByPayload({ email }: any): Promise<LoginDto> {
    return await this.usersService.findByEmail(email);
  }

  private createTokenJWT(user) {
    const payload = { user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
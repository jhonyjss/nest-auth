import { Module, HttpModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

console.log(process.env.JWT_SECRET)
@Module({
  imports: [UsersModule, PassportModule, HttpModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3h' },
    }),],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],

  controllers: [AuthController],
})
export class AuthModule { }

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from "./users.entity"
import { CreateUsersDto } from './dto/create-users.dto';
import { LoginDto } from './dto/login.dto';
const bcrypt = require("bcrypt")

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) { }

  async findOne({ email, password }: LoginDto) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    // compare passwords    
    const areEqual = await bcrypt.compareSync(password, user.password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      emailVerified: user.email_verified,
    };

  }

  async createUser(createUsersDto: CreateUsersDto) {
    const user = await this.usersRepository.create(createUsersDto);
    if (!user) {
      throw new HttpException({ "message": "Usuário não encontrado" }, HttpStatus.BAD_REQUEST);
    }

    return this.usersRepository.save(user).catch((err) => {
      switch (err.code) {
        case 'ER_DUP_ENTRY':
          throw new HttpException({ "message": "Usuário já registrado" }, HttpStatus.BAD_REQUEST);
          break;
      }
    });

  }

  async findById(id: string) {
    const user = await this.usersRepository.findOne({ where: [{ user_id: id }]});
    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async findByEmail(email: string) {

    const user = await this.usersRepository.findOne({ where: email });
    if (!user) {
      throw new HttpException('You are not allowed', HttpStatus.UNAUTHORIZED);
    }
    return user;

  }
}
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
const bcrypt = require('bcrypt');

@Entity()
export class Users {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column()
  active: boolean;

  @BeforeInsert() async setActive() {
    this.active = true;
  }

  @Column()
  cpf: string;

  @Column()
  google_token: string;

  @Column()
  facebook_token: string;

  @Column()
  github_token: string;

  @Column()
  email_verified: boolean;

}
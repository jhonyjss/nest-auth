import { IsString, IsBoolean, Length, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly cpf: string;

  @IsString()
  @IsOptional()
  readonly google_token: string;

  @IsString()
  @IsOptional()
  readonly facebook_token: string;

  @IsString()
  @IsOptional()
  readonly github_token: string;

  @IsBoolean()
  @IsOptional()
  readonly email_verified: boolean;


}

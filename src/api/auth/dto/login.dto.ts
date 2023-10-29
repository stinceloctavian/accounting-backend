import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// Login Validations
export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}

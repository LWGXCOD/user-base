import { IsDefined, IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  @Length(2, 50)
  firstName: string;

  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  @Length(6, 50)
  password: string;
}

import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsIn,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import { GenderTypeEnum } from 'src/constants/types/gender-type';

export class UpdateUserDto {
  @IsDefined()
  @IsString()
  @Length(2, 50)
  @IsOptional()
  firstName: string;

  @IsDefined()
  @IsString()
  @Length(2, 50)
  @IsOptional()
  lastName: string;

  @IsDefined()
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsDefined()
  @IsString()
  @Length(2)
  @IsOptional()
  photo: string;

  @IsDefined()
  @IsEnum(GenderTypeEnum)
  @IsIn(['MALE', 'FEMALE'])
  @IsOptional()
  gender: GenderTypeEnum;
}

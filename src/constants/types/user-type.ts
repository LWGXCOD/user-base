import { GenderTypeEnum } from './gender-type';

export type UserType = {
  id: string;
  email: string;
  photo: string;
  gender: GenderTypeEnum;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
};

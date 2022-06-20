import { GenderTypeEnum } from '../types/gender-type';

export interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    photo: string;
    gender: GenderTypeEnum;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
    firstName: string;
  };
}

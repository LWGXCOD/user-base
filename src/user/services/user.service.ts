import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { OrderType } from 'src/constants/types/order-type';
import { UserType } from 'src/constants/types/user-type';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser)
      throw new ConflictException(
        `user with email ${createUserDto.email} already exist.`,
      );

    const saltRound = 10;
    const { password, ...other } = createUserDto;
    const hash = await bcrypt.hash(password, saltRound);

    const newUser = {
      password: hash,
      ...other,
    };

    return this.userRepository.save(newUser);
  }

  async login(user: UserType) {
    const { id, email } = user;
    const token = await this.jwtService.sign(
      { id, email },
      { secret: process.env.JWT_ACCESS_KEY },
    );
    return { token: token };
  }

  async validateUser(email: string, password: string) {
    const existingUser = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!existingUser) throw new UnauthorizedException();

    const hash = existingUser.password;

    const isMatch = await bcrypt.compareSync(password, hash);

    const user: UserType = {
      id: existingUser.id,
      email: existingUser.email,
      photo: existingUser.photo,
      gender: existingUser.gender,
      lastName: existingUser.lastName,
      createdAt: existingUser.createdAt,
      updatedAt: existingUser.updatedAt,
      firstName: existingUser.firstName,
    };

    if (isMatch) return user;

    return null;
  }

  async findAll(page: number, take: number) {
    const skip = (page - 1) * take;
    const users = await this.userRepository
      .createQueryBuilder('users')
      .select([
        'users.id',
        'users.firstName',
        'users.lastName',
        'users.email',
        'users.photo',
        'users.gender',
        'users.createdAt',
        'users.updatedAt',
      ])
      .orderBy('users.createdAt', OrderType.ASC)
      .skip(skip)
      .take(take)
      .getMany();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) throw new NotFoundException(`user not found`);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) throw new NotFoundException(`user not found`);

    return this.userRepository.update(id, dto);
  }
}

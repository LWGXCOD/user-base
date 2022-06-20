import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { ProfileController } from './controllers/profile.controller';
import { LocalAuthGuard } from 'src/user/guards/local-auth.guard';
import { UserController } from './controllers/user.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from './services/user.service';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController, ProfileController],
  providers: [
    UserService,
    LocalAuthGuard,
    LocalStrategy,
    JwtService,
    JwtStrategy,
  ],
})
export class UserModule {}

import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { UserEntity } from './user/entities/user.entity';
import { UploadModule } from './upload/upload.module';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [UserEntity],
      synchronize: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_KEY,
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
    UserModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

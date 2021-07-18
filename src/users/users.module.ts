import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { PasswordEntity } from '../auth/passwords.entity';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository, PasswordEntity, AuthService]),
  ],
  controllers: [UsersController],
  providers: [UsersRepository, AuthService, UsersService],
  exports: [AuthService],
})
export class UsersModule {}

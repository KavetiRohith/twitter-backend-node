import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { PasswordEntity } from '../auth/passwords.entity';
import { Repository } from 'typeorm';
import { UserUpdateRequestBody } from './users.controller';
import { UserEntity } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private userRepo: UsersRepository,
    private authService: AuthService,
  ) {}

  public async getUserByUsername(username: string): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: { username } });
  }

  public async getUserByUserId(id: string): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: { id } });
  }

  public async createUser(
    user: Partial<UserEntity>,
    password: string,
  ): Promise<UserEntity> {
    const usernameAlreadyExists = await this.userRepo.findOne({
      where: { username: user.username },
    });
    if (usernameAlreadyExists)
      throw new ConflictException(
        `User with username: ${user.username} already exists`,
      );

    if (user.username.length < 5)
      throw new BadRequestException('Username must be of minimum 5 characters');

    if (password.length < 8)
      throw new BadRequestException('Password must be of minimum 8 characters');

    if (password.toLowerCase() === 'password')
      throw new BadRequestException(
        'Password must not be the word password itself',
      );
    const newUser = await this.userRepo.save(user);
    await this.authService.createPasswordForNewUser(newUser.id, password);
    return newUser;
  }

  public async updateUser(
    userId: string,
    newUserDetails: UserUpdateRequestBody,
  ): Promise<UserEntity> {
    const existingUser = await this.userRepo.findOne({
      where: { id: userId },
    });
    if (!existingUser) {
      throw new BadRequestException("User doesn't exist");
    }
    if (newUserDetails.bio) existingUser.bio = newUserDetails.bio;
    if (newUserDetails.avatar) existingUser.avatar = newUserDetails.avatar;
    if (newUserDetails.name) existingUser.name = newUserDetails.name;

    return await this.userRepo.save(existingUser);
  }
}

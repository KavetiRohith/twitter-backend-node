import { Injectable } from '@nestjs/common';
import { UserUpdateRequestBody } from './users.controller';
import { UserEntity } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepo: UsersRepository) {}

  public async getUserByUsername(username: string): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: { username } });
  }

  public async getUserByUserId(id: string): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: { id } });
  }

  public async createUser(user: Partial<UserEntity>): Promise<UserEntity> {
    return await this.userRepo.save(user);
  }

  public async updateUser(
    userId: string,
    newUserDetails: UserUpdateRequestBody,
  ): Promise<UserEntity> {
    const existingUser = await this.userRepo.findOne({
      where: { id: userId }
    });
    if (!existingUser) {
      return null;
    }
    if (newUserDetails.bio) existingUser.bio = newUserDetails.bio;
    if (newUserDetails.avatar) existingUser.avatar = newUserDetails.avatar;
    if (newUserDetails.name) existingUser.name = newUserDetails.name;

    return await this.userRepo.save(existingUser);
  }
}

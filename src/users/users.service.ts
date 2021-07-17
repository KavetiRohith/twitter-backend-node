import { Injectable } from '@nestjs/common';
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
}

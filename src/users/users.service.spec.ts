import { Test, TestingModule } from '@nestjs/testing';
import { getCustomRepositoryToken, getRepositoryToken } from '@nestjs/typeorm';
import { PasswordEntity } from '../auth/passwords.entity';
import { UsersRepository } from './users.repository';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [
        UsersService,
        {
          provide: getCustomRepositoryToken(UsersRepository),
          useValue: {},
        },
        {
          provide: getRepositoryToken(PasswordEntity),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

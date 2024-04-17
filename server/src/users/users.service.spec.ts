import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { User } from '@prisma/client';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const newUser: Partial<User> = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        username: 'johndoe3',
        password: 'password',
        cell: '11111111111',
      };

      const createdUser = await service.create(newUser as User);
      expect(createdUser).toBeDefined();
      expect(createdUser).toMatchObject(newUser);
    });
  });
  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toBeInstanceOf(Array);
    });
  });

  describe('findOne', () => {
    it('should return a user by username', async () => {
      const username = 'johndoe';
      const user = await service.findOne(username);
      expect(user.username).toEqual(username);
    });

    it('should throw an error if user not found', async () => {
      const username = 'nonExistingUserId';
      await expect(service.findOne(username)).rejects.toThrow();
    });
  });
});

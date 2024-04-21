import { Injectable } from '@nestjs/common';
import { CreateUser } from './dto/create-user';
import { UpdateUser } from './dto/update-user';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(CreateUser: CreateUser): Promise<User> {
    return this.prisma.user.create({ data: CreateUser }).catch((error) => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new GraphQLError('User already exists');
      }
      throw new GraphQLError('Server failure');
    });
  }

  async findAll() {
    return this.prisma.user.findMany().catch((error) => {
      throw new GraphQLError('Error occurred while fetching users.');
    });
  }

  async findOne(username: string) {
    return this.prisma.user
      .findUnique({ where: { username: username } })
      .then((res) => {
        if (!res) {
          throw new GraphQLError('User not found');
        }
        return res;
      })
      .catch((error) => {
        throw new GraphQLError('Error occurred while finding user.');
      });
  }

  async update(username: string, UpdateUser: UpdateUser) {
    return this.prisma.user
      .update({
        where: { username: username },
        data: UpdateUser,
      })
      .catch((error) => {
        throw new GraphQLError('Error occurred while updating user.');
      });
  }

  async remove(username: string) {
    return this.prisma.user
      .delete({ where: { username: username } })
      .catch((error) => {
        throw new GraphQLError('Error occurred while deleting user.');
      });
  }
}

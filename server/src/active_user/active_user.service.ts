import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GraphQLError } from 'graphql';

@Injectable()
export class ActiveUserService {
  constructor(private prisma: PrismaService) {}

  async createActiveUser(username: string, password: string) {
    const res = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (res === null) {
      throw new GraphQLError('User not found');
    }
    // If user exists and correct password is used - create active user
    if (password === res.password) {
      const expiresIn = new Date(Date.now() + 5 * 60 * 1000);
      return this.prisma.activeUser.upsert({
        where: { userID: res.id },
        create: { userID: res.id, username: username, expiresIn: expiresIn },
        update: { expiresIn: expiresIn },
      });
    } else {
      throw new GraphQLError('Not authorized');
    }
  }

  async findAll() {
    return this.prisma.activeUser.findMany({
      where: { expiresIn: { gte: new Date(Date.now()) } },
    });
  }
}

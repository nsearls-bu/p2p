import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import e from 'express';

@Injectable()
export class ActiveUserService {
  constructor(private prisma: PrismaService) {}

  async createActiveUser(username: string, password: string) {
    const res = await this.prisma.user.findUnique({
      where: { username: username },
    });
    // If user exists and correct password is used - create active user
    if (password === res.password) {
      const expiresIn = new Date(Date.now() + 5 * 60 * 1000);
      return this.prisma.activeUser.upsert({
        where: { userID: res.id },
        create: { userID: res.id, username: username, expiresIn: expiresIn },
        update: { expiresIn: expiresIn },
      });
    }
  }

  async findAll() {
    return this.prisma.activeUser.findMany();
  }
}

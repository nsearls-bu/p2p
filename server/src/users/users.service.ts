import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUser } from './dto/create-user';
import { UpdateUser } from './dto/update-user';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(CreateUser: CreateUser): Promise<User> {
    return this.prisma.user.create({ data: CreateUser });
  }

  async findAll() {
    const res = this.prisma.user.findMany();
    if (res === null) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  async findOne(username: string) {
    const res = this.prisma.user.findUnique({ where: { username: username } });
    if (res == null) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  async update(username: string, UpdateUser: UpdateUser) {
    return this.prisma.user.update({
      where: { username: username },
      data: UpdateUser,
    });
  }

  async remove(username: string) {
    return this.prisma.user.delete({ where: { username: username } });
  }
}

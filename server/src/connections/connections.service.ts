import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GraphQLError } from 'graphql';

@Injectable()
export class ConnectionsService {
  constructor(private prisma: PrismaService) {}
  async startConnection(
    initiatorUsername: string,
    recipientUsername: string,
    initiatorSDP,
  ) {
    const newConnection = await this.prisma.connection.upsert({
      where: {
        initiatorUsername_recipientUsername: {
          initiatorUsername,
          recipientUsername,
        },
      },
      update: { initiatorSDP: initiatorSDP, answerSDP: '' },
      create: {
        initiatorUsername: initiatorUsername,
        recipientUsername: recipientUsername,
        initiatorSDP: initiatorSDP,
      },
    });
    return newConnection;
  }
  async updateConnection(
    answerSDP: string,
    initiatorUsername: string,
    recipientUsername,
  ) {
    try {
      return this.prisma.connection.update({
        where: {
          initiatorUsername_recipientUsername: {
            initiatorUsername,
            recipientUsername,
          },
        },
        data: { answerSDP: answerSDP },
      });
    } catch {
      throw new GraphQLError('Connection now found');
    }
  }
}

import { Injectable } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { PrismaService } from '../prisma/prisma.service';
import { GraphQLError } from 'graphql';
import { Prisma } from '@prisma/client';
@Injectable()
export class ChatsService {
  constructor(private prisma: PrismaService) {}

  // Method to create a new chat
  async create(createChatInput: CreateChatInput) {
    return this.prisma.message
      .create({ data: createChatInput })
      .catch((error) => {
        // Handling unique constraint violation error
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new GraphQLError(
            'Chat creation failed: Unique constraint violated.',
          );
        }
        // Handling other errors
        throw new GraphQLError('Chat creation failed.');
      });
  }

  // Method to find chats sent from a specific user
  async findFrom(id: string) {
    return this.prisma.message
      .findMany({ where: { senderID: id } })
      .catch((error) => {
        // Handling errors while fetching chats from sender
        throw new GraphQLError(
          'Error occurred while fetching chats from sender.',
        );
      });
  }

  // Method to find chats sent to a specific user
  async findTo(id: string) {
    return this.prisma.message
      .findMany({ where: { recipientID: id } })
      .catch((error) => {
        // Handling errors while fetching chats to recipient
        throw new GraphQLError(
          'Error occurred while fetching chats to recipient.',
        );
      });
  }

  // Method to update a chat
  async update(id: string, updateChatInput: UpdateChatInput) {
    return this.prisma.message
      .update({
        where: { id: id },
        data: { messageContents: updateChatInput.messageContents },
      })
      .catch((error) => {
        // Handling errors while updating a chat
        throw new GraphQLError('Error occurred while updating chat.');
      });
  }

  // Method to remove a chat
  async remove(id: string) {
    return this.prisma.message.delete({ where: { id: id } }).catch((error) => {
      // Handling errors while deleting a chat
      throw new GraphQLError('Error occurred while deleting chat.');
    });
  }
}

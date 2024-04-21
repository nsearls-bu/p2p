import { Test, TestingModule } from '@nestjs/testing';
import { ChatsResolver } from './chats.resolver';
import { ChatsService } from './chats.service';
import { PrismaModule } from '../prisma/prisma.module';
describe('ChatsResolver', () => {
  let resolver: ChatsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [ChatsResolver, ChatsService],
    }).compile();

    resolver = module.get<ChatsResolver>(ChatsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionsResolver } from './connections.resolver';
import { ConnectionsService } from './connections.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('ConnectionsResolver', () => {
  let resolver: ConnectionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],

      providers: [ConnectionsResolver, ConnectionsService],
    }).compile();

    resolver = module.get<ConnectionsResolver>(ConnectionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

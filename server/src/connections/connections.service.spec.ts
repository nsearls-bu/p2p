import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionsService } from './connections.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('ConnectionsService', () => {
  let service: ConnectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],

      providers: [ConnectionsService],
    }).compile();

    service = module.get<ConnectionsService>(ConnectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

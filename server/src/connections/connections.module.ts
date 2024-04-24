import { Module } from '@nestjs/common';
import { ConnectionsService } from './connections.service';
import { ConnectionsResolver } from './connections.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ConnectionsResolver, ConnectionsService],
})
export class ConnectionsModule {}

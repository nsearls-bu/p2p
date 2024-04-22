import { Module } from '@nestjs/common';
import { ActiveUserService } from './active_user.service';
import { ActiveUserResolver } from './active_user.resolver';
import { PrismaModule } from '../prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  providers: [ActiveUserService, ActiveUserResolver],
})
export class ActiveUsersModule {}

import { Resolver, Subscription, Mutation, Args, Query } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ActiveUser } from './entities/active_user.entity';
import { ActiveUserService } from './active_user.service';

@Resolver(() => ActiveUser)
export class ActiveUserResolver {
  constructor(private readonly activeUserService: ActiveUserService) {}
  pubSub = new PubSub();

  @Mutation(() => ActiveUser)
  async createActiveUser(
    @Args('password', { type: () => String }) password: string,
    @Args('username', { type: () => String }) username: string,
  ) {
    const active_user = await this.activeUserService.createActiveUser(
      username,
      password,
    );
    return active_user;
  }

  @Query(() => [ActiveUser], { name: 'active_user' })
  findAll() {
    return this.activeUserService.findAll();
  }
}

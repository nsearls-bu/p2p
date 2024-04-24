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
    const active_users = await this.activeUserService.findAll();
    this.pubSub.publish('newListActiveUsers', {
      newListActiveUsers: active_users,
    });
    return active_user;
  }

  @Subscription(() => [ActiveUser]!)
  newListActiveUsers() {
    return this.pubSub.asyncIterator('newListActiveUsers');
  }

  @Query(() => [ActiveUser], { name: 'active_user' })
  findAll() {
    const active_users = this.activeUserService.findAll();
    return active_users;
  }
}

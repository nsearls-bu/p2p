import { ConnectionsService } from './connections.service';
import { Resolver, Subscription, Mutation, Args, Query } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Connection } from './entities/connection.entity';
@Resolver()
export class ConnectionsResolver {
  constructor(private readonly connectionsService: ConnectionsService) {}
  pubSub = new PubSub();

  @Subscription(() => Connection!, {
    // filter: async (payload, variables) => {
    //   console.log(await payload.waitForConnection);
    //   console.log(variables);
    //   return (
    //     (await payload.waitForConnection.recipientUsername) ===
    //     variables.username
    //   );
    // },
  })
  waitForConnection(
    @Args('username', { type: () => String }) username: string,
  ) {
    console.log(this.pubSub);
    return this.pubSub.asyncIterator('waitForConnection');
  }

  @Mutation(() => Connection)
  startConnection(
    @Args('initiatorUsername', { type: () => String })
    initiatorUsername: string,
    @Args('recipientUsername', { type: () => String })
    recipientUsername: string,

    @Args('initiatorSDP', { type: () => String }) initiatorSDP: object,
  ) {
    const newConnection = this.connectionsService.startConnection(
      initiatorUsername,
      recipientUsername,
      initiatorSDP,
    );

    this.pubSub.publish('waitForConnection', {
      waitForConnection: newConnection,
    });
    return newConnection;
  }
  @Mutation(() => Connection)
  respondToHandShake(
    @Args('answerSDP', { type: () => String }) answerSDP: string,
    @Args('initiatorUsername', { type: () => String })
    initiatorUsername: string,
    @Args('recipientUsername', { type: () => String })
    recipientUsername: string,
  ) {
    const newConnection = this.connectionsService.updateConnection(
      answerSDP,
      initiatorUsername,
      recipientUsername,
    );

    this.pubSub.publish('waitForConnection', {
      waitForConnection: newConnection,
    });

    return newConnection;
  }
}

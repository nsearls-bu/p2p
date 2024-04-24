import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType({ description: 'Represents a connection' })
export class Connection {
  @Field(() => ID, { description: 'Unique identifier of the user' })
  id: string;

  @Field({ nullable: true, description: 'Part 1 of webrtc handshake' })
  initiatorSDP: string;

  @Field({ nullable: true, description: 'Part 2 of webrtc handshake' })
  answerSDP: string;

  @Field({ description: 'initiators username' })
  initiatorUsername: string;

  @Field({ description: 'recipient username' })
  recipientUsername: string;
}

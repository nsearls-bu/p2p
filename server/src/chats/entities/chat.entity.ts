import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Chat {
  @Field(() => ID, { description: 'ID for each chat' })
  id: string;
  @Field({ description: 'ID of message sender' })
  senderID: string;
  @Field({ description: 'ID of message recipient' })
  recipientID: string;
  @Field({ defaultValue: true, description: 'Time message was sent' })
  timeSent: Date;
  @Field({ defaultValue: true, description: 'Message contents' })
  messageContents: string;
}

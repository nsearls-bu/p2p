import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateChatInput {
  @Field({ description: 'ID of message sender' })
  senderID: string;
  @Field({ description: 'ID of message recipient' })
  recipientID: string;
  @Field({ description: 'Contents of message' })
  messageContents: string;
}

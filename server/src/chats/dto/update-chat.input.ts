import { CreateChatInput } from './create-chat.input';
import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateChatInput extends OmitType(PartialType(CreateChatInput), [
  'recipientID',
  'senderID',
] as const) {
  @Field(() => String)
  id: string;
}

import { CreateUser } from './create-user';
import { InputType, Field, ID, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateUser extends PartialType(CreateUser) {
  @Field(() => ID, { description: 'Create a user' })
  id: string;
}

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType({ description: 'User entity representing a registered user' })
export class ActiveUser {
  @Field(() => ID, { description: 'Unique identifier of the user' })
  userID: string;

  @Field({ description: 'active users username' })
  username: string;

  @Field({ description: 'When the user will expire' })
  expiresIn: string;
}

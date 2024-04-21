import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUser {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  cell: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  birthday?: Date;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  street: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  state: string;

  @Field({ nullable: true })
  postalCode: string;
}

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType({ description: 'User entity representing a registered user' })
export class User {
  @Field(() => ID, { description: 'Unique identifier of the user' })
  id: string;

  @Field({ description: 'First name of the user' })
  firstName: string;

  @Field({ description: 'Last name of the user' })
  lastName: string;

  @Field({ description: 'Cell phone number of the user' })
  cell: string;

  @Field({ description: 'Email address of the user' })
  email: string;

  @Field({ description: 'Email address of the user' })
  birthdate: Date;

  @Field({ nullable: true, description: 'Optional image URL of the user' })
  image?: string; // Assuming image is an optional field

  @Field({ description: 'Username chosen by the user' })
  username: string;

  @Field({
    description:
      'Plaintext password - completely insecure - not included in this project',
  })
  password: string;
  @Field({ nullable: true, description: 'Street address' })
  street: string;

  @Field({ nullable: true, description: 'City' })
  city: string;

  @Field({ nullable: true, description: 'State' })
  state: string;

  @Field({ nullable: true, description: 'Postal code' })
  postalCode: string;
}

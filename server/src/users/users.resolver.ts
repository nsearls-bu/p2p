import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUser } from './dto/create-user';
import { UpdateUser } from './dto/update-user';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('CreateUser') CreateUser: CreateUser) {
    return this.usersService.create(CreateUser);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('username', { type: () => ID }) username: string) {
    const res = this.usersService.findOne(username);
    return res;
  }

  @Mutation(() => User)
  updateUser(@Args('UpdateUser') UpdateUser: UpdateUser) {
    return this.usersService.update(UpdateUser.username, UpdateUser);
  }

  @Mutation(() => User)
  removeUser(@Args('username', { type: () => Int }) username: string) {
    return this.usersService.remove(username);
  }
}

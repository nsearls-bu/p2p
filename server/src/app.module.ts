import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { ChatsModule } from './chats/chats.module';
import { ActiveUsersModule } from './active_user/active_user.module';
import { ApolloServerErrorCode } from '@apollo/server/errors';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      subscriptions: {
        'graphql-ws': true,
      },
      formatError: (formattedError, error) => {
        // Return a different error message

        if (
          formattedError.extensions.code ===
          ApolloServerErrorCode.INTERNAL_SERVER_ERROR
        ) {
          return {
            ...formattedError,

            message: 'Request failed',
          };
        }

        if (
          formattedError.extensions.code ===
          ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
        ) {
          return {
            ...formattedError,

            message: error.toString(),
          };
        }

        // Otherwise return the formatted error. This error can also

        // be manipulated in other ways, as long as it's returned.

        return formattedError;
      },
    }),
    UsersModule,
    ChatsModule,
    ActiveUsersModule,
  ],
})
export class AppModule {}

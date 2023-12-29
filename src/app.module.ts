import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './users/users.module';
import CommonModule from './common/common.module';
import AuthModule from './auth/auth.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    CommonModule,
    UserModule,
    AuthModule,
    PostModule,
    ConfigModule.forRoot({
      envFilePath: '.env'
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

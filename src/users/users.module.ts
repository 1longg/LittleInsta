import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UserService } from './users.service';
import { UserResolver } from './users.resolver';
import { Post } from 'src/post/post.entity';
import { PostModule } from 'src/post/post.module';
import { Token } from 'src/token/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Token]), forwardRef(() => PostModule)],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {}

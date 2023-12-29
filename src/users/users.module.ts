import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UserService } from './users.service';
import { UserResolver } from './users.resolver';
import { Post } from 'src/post/post.entity';
import { PostService } from 'src/post/post.service';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post]), forwardRef(() => PostModule)],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {}

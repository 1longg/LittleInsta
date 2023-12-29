import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostResolver } from './post.resolver';
import { User } from 'src/users/users.entity';
import { UserService } from 'src/users/users.service';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User]), forwardRef(() => UserModule)],
  providers: [PostService, PostResolver],
  exports: [PostService, PostResolver]
})
export class PostModule {}

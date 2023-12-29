import { UserService } from './users.service';
import { User } from './users.entity';
import { Args, Query, Mutation, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { CreateUserDto } from './dto/createUser.dto';
import { Post } from 'src/post/post.entity';
import { PostService } from 'src/post/post.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}

  @Query(() => User)
  getProfile(@Args('user_id') user_id: string): Promise<User> {
    return this.userService.getProfileById(user_id);
  }
  @ResolveField('post', () => [Post])
  async getPostOfUser(@Parent() user: User) {
    const posts = await this.postService.getPostByUserId(user.user_id);
    return posts;
  }

  @Mutation(() => User)
  createUser(@Args('user') user: CreateUserDto): Promise<User> {
    return this.userService.createUser(user);
  }
}

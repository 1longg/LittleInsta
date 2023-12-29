import { Query, Args, Mutation, Resolver, ResolveField, Parent } from "@nestjs/graphql";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/createPost.dto";
import { Post } from "./post.entity";
import { User } from "src/users/users.entity";
import { UserService } from "src/users/users.service";

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService, private userService: UserService) {}

  @Query(() => Post)
  getPostByUserId(@Args('user_id') user_id: string): Promise<Post[]> {
    return this.postService.getPostByUserId(user_id);
  }

  @Query(() => Post)
  getPostById(@Args('post_id') post_id: string): Promise<Post>{
    return this.postService.getPostById(post_id)
  }

  @ResolveField('user',() => User)
  async getAuthorOfPost(@Parent() post: Post){
    return await this.userService.getProfileById(post.authorId)
  }

  @Mutation(() => Post)
  createPost(@Args('post') post: CreatePostDto, @Args('user_id') userID: string): Promise<Post> {
    return this.postService.createPost(post, userID);
  }

}


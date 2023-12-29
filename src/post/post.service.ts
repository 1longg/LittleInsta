import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Post } from "./post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Args } from "@nestjs/graphql";
import { CreatePostDto } from "./dto/createPost.dto";
import { User } from "src/users/users.entity";

@Injectable()
export class PostService{
    constructor(
       @InjectRepository(Post)
       private readonly postRepository: Repository<Post>,

       @InjectRepository(User)
       private readonly userRepository: Repository<User>
    ){}

    async createPost(@Args('post') createPostDto: CreatePostDto, @Args('user_id') userID: string): Promise<Post>{
        const user = await this.userRepository.findOne({where: {user_id: userID}});

        const post = this.postRepository.create({...createPostDto, authorId: userID, user});
        return this.postRepository.save(post);
    }

    async getPostByUserId(userId: string): Promise<Post[]>{
        const post = await this.postRepository.find({where: {user: {user_id: userId}}});
        return post;
    }

    async getPostById(postId: string): Promise<Post>{
        const post = await this.postRepository.findOne({where: {post_id: postId}});
        return post
    }
}
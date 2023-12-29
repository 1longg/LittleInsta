import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";

@ObjectType('Post')
@Entity('post')
export class Post{
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    post_id: string;

    @Field(() => String)
    @Column()
    content: string;

    @Field(() => [String])
    @Column("text", {array: true})
    images: string[];

    @Field(() => ID)
    @Column()
    authorId: string;

    @Field(() => String)
    @ManyToOne(() => User, user => user.post)
    @JoinColumn({name: 'user_id'})
    user: User;
}
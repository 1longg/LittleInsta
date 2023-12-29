import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/post/post.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import 'reflect-metadata';

@Entity('users')
@ObjectType('User')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Field(() => String)
  @Column({ unique: true })
  name: string;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => String, {defaultValue: '123'})
  @Column({ default: '123' })
  imageURL: string;

  @Field(() => String, {nullable: true})
  @Column({nullable: true})
  bio: string;

  @Field(() => [Post])
  @OneToMany(() => Post, post => post.user)
  post: Post[]
}

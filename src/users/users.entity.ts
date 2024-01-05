import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/post/post.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import 'reflect-metadata';
import { Token } from 'src/token/token.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
@ObjectType('User')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Field(() => String)
  @Column({ unique: true })
  username: string;

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

  @OneToOne(() => Token, token => token.user)
  @Field(() => Token)
  token: Token
}

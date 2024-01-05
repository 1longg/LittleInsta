import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity('token')
export class Token{
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field(() => String, {nullable: true})
    @Column({nullable: true})
    refreshToken: string;

    @Field(() => String)
    @Column()
    secretKey: string;

    @Field(() => User)
    @OneToOne(() => User, user => user.token, {onDelete: 'CASCADE'})
    @JoinColumn()
    user: User
}
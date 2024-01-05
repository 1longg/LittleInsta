import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class RegisterDto{
    @Field(() => String)
    email: string;
    @Field(() => String)
    username: string;
    @Field(() => String)
    password: string
}
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginDto{
    @Field(() => String)
    username: string;
    @Field(() => String)
    password: string;
}
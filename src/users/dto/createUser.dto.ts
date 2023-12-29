import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field(() => ID, {nullable: true})
  user_id: string;
  @Field(() => String)
  name: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
  @Field(() => String, { defaultValue: '123' })
  imageURL: string;
}

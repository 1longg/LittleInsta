import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostDto {
  @Field(() => String)
  content: string;
  @Field(() => [String])
  images: [string];
}

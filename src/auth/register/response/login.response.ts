import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/users.entity';

@ObjectType()
export class LoginReponse {
  @Field(() => User)
  user: User;

  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}

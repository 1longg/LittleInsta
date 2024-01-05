import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/users.entity';
import { RegisterDto } from './register/dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './login/dto/login.dto';
import { LoginReponse } from './register/response/login.response';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  async register(@Args('registerDto') registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Mutation(() => LoginReponse)
  async login(@Args('loginDto') loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

}

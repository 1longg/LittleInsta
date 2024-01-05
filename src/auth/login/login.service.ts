import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class LoginService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private tokenService: TokenService) {}
  async login(@Args('loginDto') loginDto: LoginDto) {
    const user = await this.userRepository.findOne({ where: { username: loginDto.username } });
    if (!user) throw new ConflictException('Email don\'t exist');
    const checkPassword = await bcrypt.compare(loginDto.password, user.password)
    if(checkPassword){
      const secretKey = await this.tokenService.findSecretKey(user.user_id)
      const accessToken = await this.tokenService.createAccessToken({username: user.username}, secretKey) 
      const refreshToken = await this.tokenService.createRefreshToken({username: user.username}, secretKey)
      await this.tokenService.importRefreshTokenToDB(user.user_id, refreshToken)
      return {user, accessToken, refreshToken}
    }
    throw new UnauthorizedException('Wrong password!')
  }
}

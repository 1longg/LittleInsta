import { ConflictException, Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private tokenService: TokenService
  ) {}

  async register(@Args('registerDto') registerDto: RegisterDto) {
    const isEmailExist = await this.userRepository.findOne({ where: { email: registerDto.email } });
    if (isEmailExist) throw new ConflictException('Email already exist');
    const isUserNameExist = await this.userRepository.findOne({ where: { username: registerDto.username } });
    if (isUserNameExist) throw new ConflictException('Username already exist');
    try {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(registerDto.password, salt);
      const user = this.userRepository.create({ ...registerDto, password: passwordHash });
      await this.userRepository.save(user);
      const secretKey = await this.tokenService.createKeyPair();
      await this.tokenService.importKeyToDB(user.user_id, secretKey);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}

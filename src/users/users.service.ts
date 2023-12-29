import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { Args } from '@nestjs/graphql';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}
    async createUser(@Args('user') createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user)
    }

    async getProfileById(id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { user_id: id } });
        return user;
    }
}

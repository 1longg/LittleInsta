import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(@InjectRepository(Token) private tokenRepository: Repository<Token>, private jwtService: JwtService) {}

  async createKeyPair() {
    const secretKey = randomBytes(32).toString('hex')
    return secretKey
  }

  async importKeyToDB(userID: string, secretKey: string) {
    const token = await this.tokenRepository.findOne({where: {user: {user_id: userID}}})
    return this.tokenRepository.save({...token, secretKey});
  }

  async importRefreshTokenToDB(userID: string, refreshToken: string) {
    const token = await this.tokenRepository.findOne({where: {user: {user_id: userID}}})
    return this.tokenRepository.save({...token, refreshToken});
  }

  async findSecretKey(userID: string): Promise<string> {
    const token = await this.tokenRepository.findOne({ where: {user: {user_id: userID}} });
    if (!token) throw new BadRequestException('Don\'t have key pair');
    return token.secretKey;
  }

  async createRefreshToken(payload: { username: string}, secretKey: string){
    const refreshToken = this.jwtService.sign(payload, {secret: secretKey, expiresIn: '7d'});
    return refreshToken;
  }

  async createAccessToken(payload: { username: string }, secretKey: string) {
    const accessToken = this.jwtService.sign(payload, {secret: secretKey, expiresIn: '15m'});
    return accessToken;
  }
}

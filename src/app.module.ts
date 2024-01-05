import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/users.module';
import CommonModule from './common/common.module';
import AuthModule from './auth/auth.module';
import { PostModule } from './post/post.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    CommonModule,
    UserModule,
    AuthModule,
    PostModule,
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    JwtModule.register({})
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

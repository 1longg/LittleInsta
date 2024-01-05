import { Module } from "@nestjs/common";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { RegisterService } from "./register/register.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { PassportModule } from "@nestjs/passport";
import { LoginService } from "./login/login.service";
import { Token } from "src/token/token.entity";
import { TokenModule } from "src/token/token.module";

@Module({
    imports: [TypeOrmModule.forFeature([User, Token]), TokenModule],
    providers: [AuthResolver, AuthService, LoginService, RegisterService],
    exports: [AuthService]
})
export default class AuthModule {
}
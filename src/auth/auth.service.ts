import { Injectable } from "@nestjs/common";
import { RegisterService } from "./register/register.service";
import { Args } from "@nestjs/graphql";
import { RegisterDto } from "./register/dto/register.dto";
import { LoginService } from "./login/login.service";
import { LoginDto } from "./login/dto/login.dto";

@Injectable()
export class AuthService{
    constructor(private registerService: RegisterService, private loginService: LoginService){

    }
    async register(@Args('registerDto') registerDto: RegisterDto){
        return this.registerService.register(registerDto)
    }

    async login(@Args('loginDto') loginDto: LoginDto){
        return this.loginService.login(loginDto)
    }
}
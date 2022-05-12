import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import UserCreateUserDto from "../users/dto/user.create-user.dto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('login')
    login(@Body() userDto: UserCreateUserDto) {
        return this.authService.login(userDto)
    }

    @Post('register')
    register(@Body() userDto: UserCreateUserDto) {
        return this.authService.register(userDto)
    }

}

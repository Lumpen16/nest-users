import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import UserCreateUserDto from "../users/dto/user.create-user.dto";
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcrypt'
import has = Reflect.has;
import User from "../users/user.entity";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService) {
    }
    async login(userDto: UserCreateUserDto) {
        const user = await this.userService.getUserByUsername(userDto.username)
        if (!user) {
            throw new UnauthorizedException({message: 'Некорректный логин или пароль'})
        }
        const isPasswordEqual = await bcrypt.compare(userDto.password, user.password)
        if (user && isPasswordEqual) {
            return this.generateToken(user)
        }
        throw new UnauthorizedException({message: 'Некорректный логин или пароль'})
    }

    private async generateToken(user: User) {
        const payload = {
            id: user.id,
            username: user.username
        }
            return {
                token: this.jwtService.sign(payload)
            }

    }
    async register(userDto: UserCreateUserDto) {
        const candidate = await this.userService.getUserByUsername(userDto.username)
        if (candidate) {
            throw new HttpException({ message: 'Пользователь с таким именем уже существует'}, HttpStatus.BAD_REQUEST)
        }
        const user = await this.userService.createUser(userDto)
        return this.generateToken(user)
    }
}

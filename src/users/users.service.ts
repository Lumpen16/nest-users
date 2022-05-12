import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import UserCreateUserDto from "./dto/user.create-user.dto";
import User from "./user.entity";
import {Request} from "express";
import * as bcrypt from 'bcrypt'
import UserChangeUserDto from "./dto/user.change-user.dto";
import UsersDeleteUserDto from "./dto/user.delete-user.dto";

@Injectable()
export class UsersService {

    async getAllUsers(request: Request<any>) {
        // @ts-ignore
        if (request) {
            // @ts-ignore
            return {users: await User.find(), token: request.token}
        }
        throw new HttpException({message: "Пользователь не авторизован"}, HttpStatus.FORBIDDEN)
    }

    async createUser(userDto: UserCreateUserDto) {
        const user: User = User.create()
        user.username = userDto.username
        user.password = await bcrypt.hash(userDto.password, 10)
        await User.save(user)
        return user
    }

    async getUserByUsername(username: string) {
        return await User.findOne({ where: {username: username}})
    }

    async deleteUser(request: Request<any>, userDto: UsersDeleteUserDto) {
        // @ts-ignore
        const user = await User.findOne(request.user.id)
        if (user && await bcrypt.compare(userDto.password, user.password)) {
            await User.delete(user.id)
            return {
                message: 'Пользователь удален',
                status: HttpStatus.OK
            }
        }
        throw new HttpException({message: "Пользователь не найден"}, HttpStatus.NOT_FOUND)

    }

    async changeUser(request: Request<any>, userDto: UserChangeUserDto) {
        // @ts-ignore
        const user = await User.findOne(request.user.id)
        if (user && await bcrypt.compare(userDto.old_password, user.password)) {
            user.username = userDto?.new_username
            user.password = await bcrypt.hash(userDto?.new_password, 10)
            await User.update(user.id, user)
            return {
                // @ts-ignore
                token: request.token
            }
        }
        throw new HttpException({message: "Пользователь не найден"}, HttpStatus.NOT_FOUND)
    }}



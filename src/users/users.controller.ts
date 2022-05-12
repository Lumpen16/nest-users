import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/auth.guard";
import {UsersService} from "./users.service";
import {Request} from "express";
import UserCreateUserDto from "./dto/user.create-user.dto";
import UserChangeUserDto from "./dto/user.change-user.dto";
import UsersDeleteUserDto from "./dto/user.delete-user.dto";

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {

    }
    @Get('getAll')
    @UseGuards(JwtAuthGuard)
    getAllUsers(@Req() request: Request<any>) {
        return this.userService.getAllUsers(request)
    }

    @Post('deleteUser')
    @UseGuards(JwtAuthGuard)
    deleteUser(@Req() request: Request<any>, @Body() userDto: UsersDeleteUserDto) {
        return this.userService.deleteUser(request, userDto)
    }

    @Post('changeUser')
    @UseGuards(JwtAuthGuard)
    changeUser(@Req() request: Request<any>, @Body() userDto: UserChangeUserDto) {
        return this.userService.changeUser(request, userDto)
    }
}

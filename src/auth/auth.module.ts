import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import {JwtModule, JwtService} from "@nestjs/jwt";
import {AuthController} from "./auth.controller";
import {UsersModule} from "../users/users.module";
import {UsersService} from "../users/users.service";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
      JwtModule.register({
        secret: process.env.SECRET_KEY || 'secret',
        signOptions: {
          expiresIn: '900s'
        }
      }),
      forwardRef( () => UsersModule),

  ],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}

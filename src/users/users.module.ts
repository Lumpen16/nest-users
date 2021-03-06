import {forwardRef, Module} from '@nestjs/common';
import { UsersService } from './users.service';
import {UsersController} from "./users.controller";
import {JwtAuthGuard} from "../auth/auth.guard";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
      forwardRef( () => AuthModule)
  ],
  exports: [UsersService]
})
export class UsersModule {}

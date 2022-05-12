import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import User from "./users/user.entity";

@Module({
  imports: [
      UsersModule,
      AuthModule,
      TypeOrmModule.forRoot({
        type: 'mongodb',
        url: process.env.MONGODB_HOST,
        database: process.env.MONGODB_DB_NAME,
        entities: [User]
      })
       ],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService],
})
export class AppModule {}

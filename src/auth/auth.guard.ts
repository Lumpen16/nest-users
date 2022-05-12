import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()

        try {
            const authHeader = req.headers.authorization
            const [bearer, token] = authHeader.split(' ')
            if (bearer !== 'Bearer' || !token) {

                throw new UnauthorizedException("Пользователь не авторизован")
            }
            this.jwtService.verify(token)
            req.user = this.jwtService.decode(token)
            const {username: username, id: id} = req.user
            req.token = this.jwtService.sign({id: id, username: username})
            return true
        }
        catch (e) {
            console.log(e)
            throw new UnauthorizedException("Пользователь не авторизован")
        }
    }

}
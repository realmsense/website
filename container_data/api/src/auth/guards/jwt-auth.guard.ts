
import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { SKIP_JWT_KEY } from "../constants";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {

    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_JWT_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (skipAuth) {
            return true;
        }

        return super.canActivate(context);
    }

}

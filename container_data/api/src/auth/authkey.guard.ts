import { CanActivate, ExecutionContext, Injectable, mixin } from "@nestjs/common";

// https://stackoverflow.com/questions/62046413/is-it-possible-to-pass-a-parameter-to-a-nestjs-guard
export const AuthKeyGuard = (key: string) => {

    class AuthKeyGuard implements CanActivate {
        canActivate(context: ExecutionContext): boolean {
            const request = context.switchToHttp().getRequest();
            const params = request.body;

            if (params.authkey == key)
                return true

            return false;
        }
    }

    const guard = mixin(AuthKeyGuard);
    return guard;
};
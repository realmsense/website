import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ENV } from "@realmsense/shared";
import { Observable } from "rxjs";
import { ACCESS_TOKEN_KEY } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() { }

    public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        if (!request.url.startsWith(ENV.URL.API)) {
            return next.handle(request);
        }

        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        if (!accessToken) {
            return next.handle(request);
        }

        const cloned = request.clone({
            headers: request.headers.set("Authorization", "Bearer " + accessToken)
        });
        return next.handle(cloned);
    }
}

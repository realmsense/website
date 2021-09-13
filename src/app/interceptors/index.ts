import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { Provider } from "@angular/core";
import { AuthInterceptor } from "./auth.interceptor";

// HTTP interceptor providers in outside-in order
export const HTTP_INTERCEPTOR_PROVIDERS: Provider[] = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];

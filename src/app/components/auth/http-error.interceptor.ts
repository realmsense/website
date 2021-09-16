import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ErrorModalComponent } from "../error-modal/error-modal.component";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor() { }

    public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(catchError(this.handleHttpError.bind(this)));
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    private handleHttpError(error: HttpErrorResponse) {
        const errorModal = ErrorModalComponent.instance;
        errorModal.show(`${error.status} ${error.statusText}`, error.message);
        return throwError(error);
    }
}
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertModalComponent } from "../../components/alert-modal/alert-modal.component";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor() { }

    public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(catchError(this.handleHttpError.bind(this)));
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    private handleHttpError(error: HttpErrorResponse) {
        const alertModal = AlertModalComponent.instance;
        alertModal.show("danger", error.error.message);
        console.log(error);
        return throwError(error);
    }
}
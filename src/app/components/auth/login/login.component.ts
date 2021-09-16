import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AccessToken } from "src/app/components/auth/models/accesstoken.model";
import { AuthService } from "src/app/components/auth/auth.service";

interface Alert {
    type: string;
    message: string;
}

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

    public alert: Alert;

    public username: string;
    public password: string;

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private authService: AuthService
    ) { }

    public ngOnInit(): void {
        this.alert = { type: "secondary d-none", message: "" }; // hidden alert
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    private handleLoginError(error: HttpErrorResponse) {
        this.alert = {
            type: "danger",
            message: `${error.status} ${error.statusText}`
        };

        return throwError("Failed to login");
    }

    private handleLoginSuccess(accessToken: AccessToken): void {

        this.alert = {
            type: "success",
            message: "Successfully logged in! Redirecting..."
        };

        this.router.navigateByUrl("/admin");
    }

    public login(): void {
        if (!this.username || !this.password) {
            this.alert = {
                type: "warning",
                message: "Please enter a username and password"
            };
            return;
        }

        this.authService.login(this.username, this.password)
            .pipe(catchError(this.handleLoginError.bind(this)))
            .subscribe(this.handleLoginSuccess.bind(this));
    }
}

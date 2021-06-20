import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { API_URL } from "src/app/models/constants";
import { AuthService } from "src/app/services/auth.service";

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

    alert: Alert;

    username: string;
    password: string;

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.alert = { type: "secondary d-none", message: "" }; // hidden alert
    }

    private handleLoginError(error: HttpErrorResponse) {
        this.alert = {
            type: "danger",
            message: `${error.status} ${error.statusText}`
        };

        return throwError("Failed to login");
    }

    private handleLoginSuccess(accessToken: string) {

        this.alert = {
            type: "success",
            message: "Successfully logged in! Redirecting..."
        };

        this.authService.setSession(accessToken);

        this.router.navigateByUrl("/admin");
    }

    async login() {
        if (!this.username || !this.password) {
            this.alert = {
                type: "warning",
                message: "Please enter a username and password"
            };
            return;
        }

        this.httpClient.post(API_URL + "/auth/login", { username: this.username, password: this.password }, {responseType: "text"})
            .pipe(catchError(this.handleLoginError.bind(this)))
            .subscribe(this.handleLoginSuccess.bind(this));
    }

}

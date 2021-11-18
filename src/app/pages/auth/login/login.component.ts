import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertModalComponent } from "../../../components/alert-modal/alert-modal.component";
import { AuthService } from "../auth.service";
import { AccessToken } from "../models";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

    public username: string;
    public password: string;
    private alertModal = AlertModalComponent.instance;

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private authService: AuthService
    ) { }

    public ngOnInit(): void {
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    private handleLoginError(error: HttpErrorResponse) {
        this.alertModal.show("danger", "Invalid username or password");
        return throwError("Failed to login");
    }

    private handleLoginSuccess(accessToken: AccessToken): void {

        this.alertModal.show("success", "Successfully logged in!");
        this.router.navigateByUrl("/dashboard");
    }

    public login(): void {
        if (!this.username || !this.password) {
            this.alertModal.show("warning", "Please enter a username and password");
            return;
        }

        this.authService.login(this.username, this.password)
            .pipe(catchError(this.handleLoginError.bind(this)))
            .subscribe(this.handleLoginSuccess.bind(this));
    }
}

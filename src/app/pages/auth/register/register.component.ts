import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertModalComponent } from "../../../components/alert-modal/alert-modal.component";
import { AuthService } from "../auth.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss", "../login/login.component.scss"]
})
export class RegisterComponent implements OnInit {

    public username: string;
    public password: string;
    public repeatPassword: string;
    private alertModal = AlertModalComponent.instance;

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private authService: AuthService
    ) { }

    public ngOnInit(): void {
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    private handleRegisterError(error: HttpErrorResponse) {
        this.alertModal.show("danger", "An error occurred when creating your account.");
        return throwError("Failed to create account.");
    }

    private handleRegisterSuccess(): void {
        this.alertModal.show("success", "Account Created! Please log in.");
        this.router.navigateByUrl("/login");
    }

    public register(): void {
        if (!this.username || !this.password) {
            this.alertModal.show("warning", "Please enter a username and password.");
            return;
        }

        if (this.password != this.repeatPassword) {
            this.alertModal.show("warning", "Password does not match.");
            return;
        }

        this.authService.register(this.username, this.password)
            .pipe(catchError(this.handleRegisterError.bind(this)))
            .subscribe(this.handleRegisterSuccess.bind(this));
    }
}

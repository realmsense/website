import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/components/auth/auth.service";

@Component({
    selector: "app-admin",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {

    public title = "Admin Panel";

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    public ngOnInit(): void {
        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl("/login");
            return;
        }
    }
}

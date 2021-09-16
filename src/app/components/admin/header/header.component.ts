import { Component, Input, OnInit } from "@angular/core";
import { AuthService } from "src/app/components/auth/auth.service";

@Component({
    selector: "admin-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {

    @Input()
    public title: string;

    constructor(private authService: AuthService) { }

    public ngOnInit(): void {
    }

    public logout(): void {
        this.authService.logout();
        window.location.reload(); // admin component automatically redirects if not logged in
    }
}

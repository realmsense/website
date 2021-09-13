import { Component, Input, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "admin-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {

    @Input() title: string;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
    }

    logout() {
        this.authService.logout();
        window.location.reload(); // admin component automatically redirects if not logged in
    }
}

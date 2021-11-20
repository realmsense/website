import { Component, OnInit, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { DateTime } from "luxon";
import packageInfo from "../../../../package.json";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: "app-admin",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {

    public title = "Admin Panel";
    
    // Sidebar
    public sideBarOpen = true;
    
    // Footer
    public appVersion = packageInfo.version;
    public currentYear: string = DateTime.now().toFormat("y");

    constructor(
        public authService: AuthService,
        private router: Router,
        private renderer: Renderer2
    ) { }

    public ngOnInit(): void {
        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl("/login");
            return;
        }
    }

    public toggleSidebar(): void {
        this.sideBarOpen = !this.sideBarOpen;

        const appRoot = document.querySelector("app-root");

        // Close
        if (this.sideBarOpen) {
            this.renderer.removeClass(appRoot, "sidebar-open");
            this.renderer.addClass(appRoot, "sidebar-collapse");
        } else {
            this.renderer.removeClass(appRoot, "sidebar-collapse");
            this.renderer.addClass(appRoot, "sidebar-open");
        }
    }
}
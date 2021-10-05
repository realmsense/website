import { Component, OnInit, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { DateTime } from "luxon";
import { AuthService } from "src/app/components/auth/auth.service";
import packageInfo from "../../../../package.json";

@Component({
    selector: "app-admin",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {

    public title = "Admin Panel";
    
    // Sidebar
    public menuList = menuList;
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

    public logout(): void {
        this.authService.logout();
        window.location.reload(); // admin component automatically redirects if not logged in
    }
}

interface MenuItem {
    header: string | null,
    children: {
        name: string;
        link: string;
        icon: string;
    }[];
}

const menuList: MenuItem[] = [
    {
        header: null,
        children: [
            { name: "Home", link: "/home", icon: "fas fa-home" },
            { name: "Download", link: "/download", icon: "fas fa-download" },
            { name: "Subscription", link: "/subscription", icon: "fas fa-dollar-sign" },
        ],
    },
    {
        header: "Tracker",
        children: [
            { name: "Realms", link: "/dashboard/tracker/realms", icon: "fas fa-poo" },
            { name: "Players", link: "/dashboard/tracker/players", icon: "fab fa-accessible-icon" },
        ],
    },
    {
        header: "Admin",
        children: [
            { name: "Builds", link: "/dashboard/admin/builds", icon: "fas fa-file-code" },
            { name: "Users", link: "/dashboard/admin/users", icon: "fas fa-users-cog" },
        ],
    }
];

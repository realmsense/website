import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../auth/auth.service";

@Component({
    selector: "app-dashboard-home",
    templateUrl: "./dashboard-home.component.html",
    styleUrls: ["./dashboard-home.component.scss", "../dashboard.component.scss"]
})
export class DashboardHomeComponent implements OnInit {

    public stats = stats;

    constructor(
        public authService: AuthService
    ) { }

    public ngOnInit(): void {
    }
}

interface Stat {
    name: string;
    color: "bg-primary" | "bg-secondary" | "bg-success" | "bg-info" | "bg-warning" | "bg-danger" | "bg-dark",
    link: string,
    sub: string;
    icon: string;
    value: number | string;
}

const stats: Stat[] = [
    {
        name: "Players",
        color: "bg-info",
        link: "/dashboard/tracker/players",
        sub: "in the last 24 hours",
        icon: "fab fa-accessible-icon",
        value: 1
    },
    {
        name: "Realms",
        color: "bg-danger",
        link: "/dashboard/tracker/realms",
        sub: "currently tracked",
        icon: "fas fa-poo",
        value: 1
    },
    {
        name: "Discord Raids",
        color: "bg-success",
        link: "/dashboard/tracker/raids",
        sub: "in the last 24 hours",
        icon: "fab fa-discord",
        value: 0
    },
    {
        name: "Key Pops",
        color: "bg-warning",
        link: "/dashboard/tracker/keypops",
        sub: "in the last 24 hours",
        icon: "fas fa-key",
        value: 0
    },
];
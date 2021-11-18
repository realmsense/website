import { Component, OnInit } from "@angular/core";
import { Card } from "../../../components/card/card.interface";
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

const stats: Card[] = [
    {
        name: "Players",
        color: "info",
        link: "/dashboard/tracker/players",
        sub: "in the last 24 hours",
        icon: "fab fa-accessible-icon",
        value: 1
    },
    {
        name: "Realms",
        color: "danger",
        link: "/dashboard/tracker/realms",
        sub: "currently tracked",
        icon: "fas fa-poo",
        value: 1
    },
    {
        name: "Discord Raids",
        color: "success",
        link: "/dashboard/tracker/raids",
        sub: "in the last 24 hours",
        icon: "fab fa-discord",
        value: 0
    },
    {
        name: "Key Pops",
        color: "warning",
        link: "/dashboard/tracker/keypops",
        sub: "in the last 24 hours",
        icon: "fas fa-key",
        value: 0
    },
];
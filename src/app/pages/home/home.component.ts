import { Component, OnInit } from "@angular/core";
import { ENV2 } from "@realmsense/shared";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

    public ENV = ENV2;

    constructor() { }

    public ngOnInit(): void { }
}
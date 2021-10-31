import { Component, OnInit } from "@angular/core";
import { ENV } from "../../../../shared/src/constants/environment.webpack";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

    public ENV = ENV;

    constructor() { }

    public ngOnInit(): void { }
}

import { Component, OnInit } from "@angular/core";
import { ENV } from "../../../../shared/src/constants/environment.webpack";
import { UtilService } from "../../services/util.service";

@Component({
    selector: "app-tos",
    templateUrl: "./tos.component.html",
    styleUrls: ["./tos.component.scss"]
})
export class TOSComponent implements OnInit {

    constructor() { }

    public ngOnInit(): void { }
}
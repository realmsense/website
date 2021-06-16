import { Component, OnInit } from "@angular/core";
import { Build } from "src/app/models/build.model";
import { BuildsService } from "src/app/services/builds.service";

@Component({
    selector: "app-builds",
    templateUrl: "./builds.component.html",
    styleUrls: ["./builds.component.scss", "../admin.component.scss"]
})
export class BuildsComponent implements OnInit {

    builds: Build[] = [
        {
            id: 1,
            enabled: true,
            file_path: "sex",
            file_size: 123,
            name: "sex dupe",
            url: ""
        },
        {
            id: 1,
            enabled: true,
            file_path: "sex",
            file_size: 123,
            name: "sex dupe",
            url: ""
        }
    ];

    constructor(private buildService: BuildsService) { }

    ngOnInit(): void {
    }

}

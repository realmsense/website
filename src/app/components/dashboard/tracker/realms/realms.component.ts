import { Component, OnInit } from "@angular/core";
import { IRealm } from "../../../../../../types/src";
import { UtilService } from "../../../../util.service";
import { RealmsService } from "./realms.service";

@Component({
    selector: "app-realms",
    templateUrl: "./realms.component.html",
    styleUrls: ["./realms.component.scss"]
})
export class RealmsComponent implements OnInit {

    public realms: IRealm[] = [];

    // TODO: add option to toggle SSE events

    constructor(
        public realmsService: RealmsService,
        public utilService: UtilService
    ) { }

    public ngOnInit(): void {
        this.realmsService.getRealms()
            .subscribe((realms) => this.realms = realms);

        this.realmsService.listenForEvents();
    }
}

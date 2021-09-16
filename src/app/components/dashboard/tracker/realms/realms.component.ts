import { Component, ComponentFactoryResolver, OnInit } from "@angular/core";
import { IRealm } from "../../../../../../types/src";
import { ENVIRONMENT } from "../../../../../environments/environment";
import { ACCESS_TOKEN_KEY } from "../../../auth/auth.service";
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
        private realmsService: RealmsService
    ) { }

    public ngOnInit(): void {
        this.realmsService.getRealms()
            .subscribe((realms) => this.realms = realms);

        this.realmsService.listenForEvents();
    }
}

import { KeyValue } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SortOrder } from "../../../../models/sort-order";
import { UtilService } from "../../../../util.service";
import { RealmOrder } from "./models/realms-order";
import { RealmsService } from "./realms.service";

@Component({
    selector: "app-realms",
    templateUrl: "./realms.component.html",
    styleUrls: ["./realms.component.scss"]
})
export class RealmsComponent implements OnInit {

    public RealmOrder = RealmOrder;
    public SortOrder = SortOrder;

    // TODO: add option to toggle SSE events

    constructor(
        public realmsService: RealmsService,
        public utilService: UtilService
    ) { }

    public ngOnInit(): void {
        this.realmsService.getRealms().subscribe();
        this.realmsService.listenForEvents();
    }
}

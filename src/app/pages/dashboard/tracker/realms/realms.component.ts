import { KeyValue } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SortOrder } from "../../../../models/sort-order";
import { UtilService } from "../../../../util.service";
import { RealmOrder } from "./models/realms-order";
import { RealmsService } from "./realms.service";
import { Servers } from "@realmsense/types";

@Component({
    selector: "app-realms",
    templateUrl: "./realms.component.html",
    styleUrls: ["./realms.component.scss", "../../dashboard.component.scss"]
})
export class RealmsComponent implements OnInit {

    // Imports
    public RealmOrder = RealmOrder;
    public SortOrder = SortOrder;
    public Servers = Servers
    
    constructor(
        public realmsService: RealmsService,
        public utilService: UtilService
    ) { }

    public ngOnInit(): void {
        this.realmsService.getRealms().subscribe();
        this.realmsService.listenForEvents();
    }
}
import { Component, Input, OnInit } from "@angular/core";
import { UtilService } from "../../services/util.service";
import { Card } from "./card.interface";

@Component({
    selector: "app-card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.scss"]
})
export class CardsComponent implements OnInit {

    @Input() public color: string;
    @Input() public icon: string;
    @Input() public name: string;
    @Input() public value: string;
    @Input() public sub: string;
    @Input() public link: string;

    constructor(
        public utilService: UtilService
    ) { }

    public ngOnInit(): void {
    }

}

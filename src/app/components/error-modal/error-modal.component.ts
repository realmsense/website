import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-error-modal",
    templateUrl: "./error-modal.component.html",
    styleUrls: ["./error-modal.component.scss"]
})
export class ErrorModalComponent implements OnInit {

    public static instance: ErrorModalComponent;

    public title: string;
    public content: string;
    public isHidden = true;

    constructor() {
        ErrorModalComponent.instance = this;
    }

    public ngOnInit(): void {
    }

    public show(title: string, content: string): void {
        this.title = title;
        this.content = content;
        this.isHidden = false;
    }

    public hide(): void {
        this.isHidden = true;
    }
}

import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { BootstrapColor } from "../../models/bootstrap-colors";

@Component({
    selector: "app-alert-modal",
    templateUrl: "./alert-modal.component.html",
    styleUrls: ["./alert-modal.component.scss"]
})
export class AlertModalComponent implements OnInit {

    public static instance: AlertModalComponent;

    @ViewChild("modal")
    public element: ElementRef;

    public color: BootstrapColor;
    public content: string;
    private timeout: NodeJS.Timeout;

    constructor() {
        AlertModalComponent.instance = this;
    }

    public ngOnInit(): void {
    }

    public show(color: this["color"], content: string, autoHide = 2000): void {
        this.color = color;
        this.content = content;
        this.element.nativeElement.style.opacity = 1;
        this.element.nativeElement.style.display = "flex";

        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.hide.bind(this), autoHide);
    }

    public hide(): void {
        this.element.nativeElement.style.opacity = 0;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.element.nativeElement.style.display = "none";
        }, 500);
    }
}

import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IBotStatus } from "@realmsense/shared";
import { LogsService } from "./logs.service";

@Component({
    selector: "app-logs",
    templateUrl: "./logs.component.html",
    styleUrls: ["./logs.component.scss", "../../dashboard.component.scss"],
    encapsulation: ViewEncapsulation.None // Overwrite global css (modal width)
})
export class LogsComponent implements OnInit {

    constructor(
        public logsService: LogsService,
        private modalService: NgbModal
    ) { }

    public ngOnInit(): void {
        this.logsService.getCurrentBotStatus();
        this.logsService.listenForEvents();
    }

    public async viewStatusHistory(content, botStatus: IBotStatus): Promise<void> {
        this.logsService.getBotStatusHistory(botStatus.guid)
            .subscribe((botStatuses) => {
                this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
            });
    }

    public statusToColor(status: IBotStatus["status"]): string {
        switch (status) {
            case "Ready":   return "success";
            case "Waiting": return "secondary";
            case "Moving":  return "primary";
            case "Error":   return "danger";
            default:        return "dark";
        }
    }
}
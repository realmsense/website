import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ENV, IBotStatus } from "@realmsense/shared";
import { Observable } from "rxjs";
import { ACCESS_TOKEN_KEY } from "src/app/pages/auth/auth.service";
import { EventSourcePolyfill } from "event-source-polyfill";

@Injectable({
    providedIn: "root"
})
export class LogsService {

    public botStatuses: IBotStatus[] = [];
    public viewingHistory: IBotStatus[] = [];

    private eventSource: EventSource;
    public eventsEnabled = true;
    
    constructor(private httpClient: HttpClient) { }

    public getCurrentBotStatus(): Observable<IBotStatus[]> {
        const req = this.httpClient.get<IBotStatus[]>(ENV.URL.API + "/logs/botStatus/current");
        req.subscribe((botStatuses) => this.botStatuses = botStatuses);
        return req;
    }

    public getBotStatusHistory(guid: string): Observable<IBotStatus[]> {
        const req = this.httpClient.get<IBotStatus[]>(ENV.URL.API + "/logs/botStatus/history", { params: { guid } });
        req.subscribe((botStatuses) => this.viewingHistory = botStatuses);
        return req;
    }

    public toggleEvents(): void {
        this.eventsEnabled = !this.eventsEnabled;

        if (!this.eventSource) return;

        if (!this.eventsEnabled) {
            this.eventSource.close();
            console.log("Disconnected from logs events");
        } else {
            this.listenForEvents();
        }
    }

    public listenForEvents(): void {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        if (!accessToken) {
            return;
        }

        this.eventSource = new EventSourcePolyfill(ENV.URL.API + "/logs/botStatus/events", {
            headers: { Authorization: "Bearer " + accessToken },
        });
        this.eventSource.addEventListener("open", this.onEventConnected.bind(this));
        this.eventSource.addEventListener("message", this.onEventMessage.bind(this));
        this.eventSource.addEventListener("error", this.onEventError.bind(this));
    }

    private onEventConnected(message: unknown): void {
        console.log("Events Connected", message);
    }

    private onEventError(message: unknown): void {
        console.log("Event Error", message);
    }

    private onEventMessage(message: any): void {
        const botStatus = JSON.parse(message.data) as IBotStatus;

        let replaced = false;
        this.botStatuses.forEach((value, index) => {
            if (value.guid == botStatus.guid) {
                this.botStatuses[index] = botStatus;
                replaced = true;
            }
        });

        if (!replaced) {
            this.botStatuses.push(botStatus);
        }

        if (botStatus.guid == this.viewingHistory?.[0].guid) {
            this.viewingHistory.unshift(botStatus);
        }
    }
}
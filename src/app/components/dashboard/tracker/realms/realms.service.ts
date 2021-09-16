import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { IRealm } from "../../../../../../types/src";
import { ENVIRONMENT } from "../../../../../environments/environment";
import { IRealmEvent } from "@realmsense/types";
import { EventSourcePolyfill } from "event-source-polyfill";
import { ACCESS_TOKEN_KEY } from "../../../auth/auth.service";

@Injectable({
    providedIn: "root"
})
export class RealmsService {

    private realms: IRealm[] = [];

    constructor(private httpClient: HttpClient) { }

    public getRealms(): Observable<IRealm[]> {
        return this.httpClient.get<IRealm[]>(ENVIRONMENT.API_URL + "/tracker/realms");
    }

    public listenForEvents(): void {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        if (!accessToken) {
            return;
        }

        // const eventSource = new EventSource(ENVIRONMENT.API_URL + "/tracker/realms/events");
        // https://stackoverflow.com/a/32440307 - To use SSE with Authentication, this pollyfill is used, as the default SSE API does not support chaning headers.
        const eventSource = new EventSourcePolyfill(ENVIRONMENT.API_URL + "/tracker/realms/events", {
            headers: { Authorization: "Bearer " + accessToken },
        });
        eventSource.addEventListener("open", this.onEventConnected.bind(this));
        eventSource.addEventListener("message", this.onEventMessage.bind(this));
        eventSource.addEventListener("error", this.onEventError.bind(this));
    }

    private onEventConnected(message: unknown): void {
        console.log("Events Connected", message);
    }

    private onEventError(message: unknown): void {
        console.log("Event Error", message);
    }

    private onEventMessage(message: any): void {
        const realmEvent = JSON.parse(message.data) as IRealmEvent;
        switch (realmEvent.event) {
            case "Created": {
                this.realms.push(realmEvent);
                console.log(`Created ${realmEvent.server.name} ${realmEvent.name}`);
                break;
            }
            case "Updated": {
                const index = this.realms.findIndex((value) => value.server.name == realmEvent.server.name && value.objectID == realmEvent.objectID);
                if (index != -1) {
                    this.realms[index] = realmEvent;
                }
                console.log(`Updated ${realmEvent.server.name} ${realmEvent.name}`);
                break;
            }
            case "Deleted": {
                const index = this.realms.findIndex((value) => value.server.name == realmEvent.server.name && value.objectID == realmEvent.objectID);
                if (index != -1) {
                    this.realms.splice(index, 1);
                }
                console.log(`Deleted ${realmEvent.server.name} ${realmEvent.name}`);
                break;
            }
        }
    }
}
import { KeyValue } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ENV, IRealm, IRealmEvent, Servers } from "@realmsense/shared";
import { EventSourcePolyfill } from "event-source-polyfill";
import { DateTime } from "luxon";
import { Observable } from "rxjs";
import { SortOrder } from "../../../../models/sort-order";
import { ACCESS_TOKEN_KEY } from "../../../auth/auth.service";
import { RealmOrder } from "./models/realms-order";

@Injectable({
    providedIn: "root"
})
export class RealmsService {

    public realms: IRealm[] = [];
    public groupedRealms: {
        [serverName: string]: IRealm[]
    };

    public realmsOrder = RealmOrder.Players;
    public sortOrder = SortOrder.Descending;
    public groupByServer = false;

    private eventSource: EventSource;
    public eventsEnabled = true;
    public lastRefreshTime: DateTime;

    constructor(private httpClient: HttpClient) { }

    public getRealms(): Observable<IRealm[]> {
        const realms = this.httpClient.get<IRealm[]>(ENV.URL.API + "/tracker/realms");
        realms.subscribe((realms) => {
            this.realms = realms;
            this.lastRefreshTime = DateTime.now();
            this.updateRealms();
        });
        return realms;
    }

    public updateRealms(): void {
        this.sortRealms();
        if (this.groupByServer) {
            this.groupRealms();
        }
    }

    public swapOrder(): void {
        if (this.sortOrder == SortOrder.Ascending) {
            this.sortOrder = SortOrder.Descending;
        } else {
            this.sortOrder = SortOrder.Ascending;
        }
        this.updateRealms();
    }

    public groupRealms(): void {
        this.groupedRealms = {};
        const realms = [...this.realms];
        for (const server of Servers) {
            this.groupedRealms[server.name] = [];

            for (const [index, realm] of realms.entries()) {
                if (realm.server.name == server.name) {
                    this.groupedRealms[server.name].push(realm);
                    // realms.splice(index, 1);
                }
            }
        }

        console.log(this.groupedRealms);
    }

    public groupedRealmSort(a: KeyValue<string, IRealm[]>, b: KeyValue<string, IRealm[]>): number {
        return b.value.length - a.value.length;
    }

    public sortRealms(order?: RealmOrder): void {
        this.realmsOrder = order ?? this.realmsOrder;
        switch (this.realmsOrder) {
            case RealmOrder.Players:
                this.realms.sort((a, b) => {
                    return a.players - b.players;
                });
                break;
            
            case RealmOrder.EventsLeft:
                // TODO
                // this.realms.sort((a, b) => {
                // });
                break;

            case RealmOrder.OpenedTime:
                this.realms.sort((a, b) => {
                    return b.openedTime - a.openedTime;
                });
                break;

            case RealmOrder.UpdatedTime:
                this.realms.sort((a, b) => {
                    return b.updatedTime - a.updatedTime;
                });
                break;
            
            default:
                break;
        }

        if (this.sortOrder == SortOrder.Descending) {
            this.realms.reverse();
        }
    }

    public toggleEvents(): void {
        this.eventsEnabled = !this.eventsEnabled;

        if (!this.eventSource) return;

        if (!this.eventsEnabled) {
            this.eventSource.close();
            console.log("Disconnected from realm events");
        } else {
            this.listenForEvents();
        }
    }

    public listenForEvents(): void {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        if (!accessToken) {
            return;
        }

        // const eventSource = new EventSource(ENV.URL.API + "/tracker/realms/events");
        // https://stackoverflow.com/a/32440307 - To use SSE with Authentication, this pollyfill is used, as the default SSE API does not support chaning headers.
        this.eventSource = new EventSourcePolyfill(ENV.URL.API + "/tracker/realms/events", {
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

        this.updateRealms();
        this.lastRefreshTime = DateTime.now();
    }

    public parsePlayersStr(realm: IRealm): string {
        let str = `${realm.players} / ${realm.maxPlayers}`;
        if (realm.queue > 0) {
            str += ` (+${realm.queue})`;
        }
        return str;
    }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ENV, IBotStatus } from "@realmsense/shared";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class LogsService {

    constructor(private httpClient: HttpClient) { }

    public getCurrentBotStatus(): Observable<IBotStatus[]> {
        return this.httpClient.get<IBotStatus[]>(ENV.URL.API + "/logs/botStatus/current");
    }

    public getBotStatusHistory(guid: string): Observable<IBotStatus[]> {
        return this.httpClient.get<IBotStatus[]>(ENV.URL.API + "/logs/botStatus/all", { params: { guid } });
    }
}
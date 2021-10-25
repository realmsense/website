import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IPlayer } from "../../../../../../shared/src";
import { ENVIRONMENT } from "../../../../../environments/environment";

@Injectable({
    providedIn: "root"
})
export class PlayersService {

    constructor(private httpClient: HttpClient) { }

    public search(name: string): Observable<IPlayer[]> {
        if (name == "") {
            return of([]);
        }

        return this.httpClient.get<IPlayer[]>(ENVIRONMENT.API_URL + "/tracker/players", { params: { name } });
    }

    public async getWatchList(): Promise<IPlayer[]> {
        const players: IPlayer[] = [];
        const names = await this.httpClient.get<string[]>(ENVIRONMENT.API_URL + "/tracker/players/watchList").toPromise();
        for (const name of names) {
            const result = await this.search(name).toPromise();
            if (result[0])
                players.push(result[0]);
        }
        return players;
    }

    public addToWatchlist(playerName: string): Promise<string[]> {
        return this.httpClient.request<string[]>("post", ENVIRONMENT.API_URL + "/tracker/players/watchList", { body: { playerName } }).toPromise();
    }

    public removeFromWatchlist(playerName: string): Promise<string[]> {
        return this.httpClient.request<string[]>("delete", ENVIRONMENT.API_URL + "/tracker/players/watchList", { body: { playerName } }).toPromise();
    }
}
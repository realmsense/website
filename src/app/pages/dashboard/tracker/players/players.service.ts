import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ENV, IPlayer } from "../../../../../../shared/src";

@Injectable({
    providedIn: "root"
})
export class PlayersService {

    constructor(private httpClient: HttpClient) { }

    public search(name: string): Observable<IPlayer[]> {
        if (name == "") {
            return of([]);
        }

        return this.httpClient.get<IPlayer[]>(ENV.URL.API + "/tracker/players", { params: { name } });
    }

    public async getWatchList(): Promise<IPlayer[]> {
        const players: IPlayer[] = [];
        const names = await this.httpClient.get<string[]>(ENV.URL.API + "/tracker/players/watchList").toPromise();
        for (const name of names) {
            const result = await this.search(name).toPromise();
            if (result[0])
                players.push(result[0]);
        }
        return players;
    }

    public addToWatchlist(playerName: string): Promise<string[]> {
        return this.httpClient.request<string[]>("post", ENV.URL.API + "/tracker/players/watchList", { body: { playerName } }).toPromise();
    }

    public removeFromWatchlist(playerName: string): Promise<string[]> {
        return this.httpClient.request<string[]>("delete", ENV.URL.API + "/tracker/players/watchList", { body: { playerName } }).toPromise();
    }
}
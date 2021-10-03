import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { PlayersService } from "./players.service";
import { Classes, IPlayer } from "@realmsense/types";
import { UtilService } from "../../../../util.service";
import { fromEvent, Observable } from "rxjs";
import { map, debounceTime, distinctUntilChanged, tap, switchMap } from "rxjs/operators";

@Component({
    selector: "app-players",
    templateUrl: "./players.component.html",
    styleUrls: ["./players.component.scss"]
})
export class PlayersComponent implements OnInit {

    // Imports
    public Classes = Classes;
    public Array = Array;

    @ViewChild("searchInput")
    public searchElement: ElementRef;
    public searching: boolean;
    public searchName: string;
    public searchResults: IPlayer[] = [];

    public watchList: IPlayer[] = [];
    public watchListUpdates: boolean;

    constructor(
        public playersService: PlayersService,
        public utilService: UtilService,
    ) { }

    public ngOnInit(): void {
        this.playersService.getWatchList()
            .then((players) => this.watchList = players);
    }

    public ngAfterViewInit(): void {
        // Player Search Typeahead
        fromEvent(this.searchElement.nativeElement, "input")
            // .pipe(map<any, any>((event: Event) => (event.target as HTMLInputElement).value))
            .pipe(tap(() => this.searching = true))
            .pipe(debounceTime(500))
            .pipe(distinctUntilChanged())
            .subscribe(this.searchPlayer.bind(this));
    }

    public searchPlayer(): void {
        this.playersService.search(this.searchName)
            .subscribe((players) => {
                this.searchResults = players;
                this.searching = false;
            });
    }

    public async addToWatchlist(player: IPlayer): Promise<void> {
        this.searchName = "";
        this.searchResults = [];

        await this.playersService.addToWatchlist(player.name);
        this.watchList = await this.playersService.getWatchList();
    }

    public async removeFromWatchlist(player: IPlayer): Promise<void> {
        await this.playersService.removeFromWatchlist(player.name);
        this.watchList = await this.playersService.getWatchList();
    }
}
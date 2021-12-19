import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Classes, IPlayer } from "@realmsense/shared";
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { UtilService } from "../../../../services/util.service";
import { PlayersService } from "./players.service";

@Component({
    selector: "app-players",
    templateUrl: "./players.component.html",
    styleUrls: ["./players.component.scss", "../../dashboard.component.scss"]
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
        // Remove the selected player from the search results. Reset search if there are no more results.
        this.searchResults = this.searchResults.filter((value) => value.name != player.name);
        if (this.searchResults.length == 0) {
            this.searchName = "";
        }

        await this.playersService.addToWatchlist(player.name);
        this.watchList = await this.playersService.getWatchList();
    }

    public async removeFromWatchlist(player: IPlayer): Promise<void> {
        await this.playersService.removeFromWatchlist(player.name);
        this.watchList = await this.playersService.getWatchList();
    }
}
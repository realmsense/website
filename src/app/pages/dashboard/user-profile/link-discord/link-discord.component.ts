import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ENVIRONMENT } from "../../../../../environments/environment";
import { AuthService } from "../../../auth/auth.service";

@Component({
    selector: "app-link-discord",
    templateUrl: "./link-discord.component.html",
    styleUrls: ["./link-discord.component.scss", "../../dashboard.component.scss"]
})
export class LinkDiscordComponent implements OnInit {

    public content = "Please wait...";

    constructor(
        private authService: AuthService,
        private httpClient: HttpClient,
        private route: ActivatedRoute
    ) { }

    public async ngOnInit(): Promise<void> {

        if (!this.authService.isLoggedIn()) return;

        const code = this.route.snapshot.queryParams["code"];

        const request = this.httpClient.post(ENVIRONMENT.API_URL + "/user/link-discord", { code }).toPromise();
        request.then(() => {
            this.content = "Successfully linked your Discord account!";
        });

        request.catch(() => {
            this.content = "An error occurred when linking your Discord account.";
        });
    }
}
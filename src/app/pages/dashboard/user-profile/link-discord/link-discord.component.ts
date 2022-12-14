import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ENV } from "@realmsense/shared";
import { AuthService } from "../../../auth/auth.service";

@Component({
    selector: "app-link-discord",
    templateUrl: "./link-discord.component.html",
    styleUrls: ["./link-discord.component.scss", "../../dashboard.component.scss"]
})
export class LinkDiscordComponent implements OnInit {

    public content = "";

    constructor(
        private authService: AuthService,
        private httpClient: HttpClient,
        private route: ActivatedRoute
    ) { }

    public async ngOnInit(): Promise<void> {

        if (!this.authService.isLoggedIn()) return;

        const code = this.route.snapshot.queryParams["code"];

        const request = this.httpClient.post(ENV.URL.API + "/user/link-discord", { code }).toPromise();
        request.then(async () => {
            await this.authService.reloadUser().toPromise();
            this.content = "Successfully linked your Discord account!";
        });

        request.catch(() => {
            this.content = "An error occurred when linking your Discord account.";
        });
    }
}
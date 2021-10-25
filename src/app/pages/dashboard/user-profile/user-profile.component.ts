import { Component, OnInit } from "@angular/core";
import { APIUser } from "discord-api-types/v9";
import { IUser } from "../../../../../shared/src";
import { ENVIRONMENT } from "../../../../environments/environment";
import { DiscordService } from "../../../services/discord.service";
import { UtilService } from "../../../services/util.service";
import { AuthService } from "../../auth/auth.service";
import { UserProfileService } from "./user-profile.service";

@Component({
    selector: "app-user",
    templateUrl: "./user-profile.component.html",
    styleUrls: ["./user-profile.component.scss", "../dashboard.component.scss"]
})
export class UserProfileComponent implements OnInit {

    // Imports
    public userDetails = userDetails;
    public API_URL = ENVIRONMENT.API_URL;

    public user: IUser;
    public discordUser: APIUser;

    public oldPassword: string;
    public newPassword: string;
    public repeatPassword: string;

    constructor(
        public userProfileService: UserProfileService,
        public authService: AuthService,
        public utilService: UtilService,
        public discordService: DiscordService
    ) { }

    public async ngOnInit(): Promise<void> {
        this.user = this.authService.user;
        await this.authService.reloadUser().toPromise();

        const discordLink = this.authService.user.discordLink;
        if (discordLink) {
            this.discordUser = await this.discordService.getUser(discordLink);
        }
    }
}

interface UserDetail {
    name: string;
    value: string;
}

const userDetails: UserDetail[] = [
    {
        "name": "Username",
        "value": "Extacy"
    },
    {
        "name": "Email",
        "value": "admin@realmsense.cc"
    },
    // {
    //     "name": "Permissions",
    //     "value": "[]"
    // },
    {
        "name": "Created",
        "value": "12:39am 18/10/2021"
    },
];
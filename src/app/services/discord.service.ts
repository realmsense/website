import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IDiscordLink } from "@realmsense/shared";
import { APIUser } from "discord-api-types/v9";
import { AuthService } from "../pages/auth/auth.service";

const DISCORD_USER_KEY = "discord_user";

@Injectable({
    providedIn: "root"
})
export class DiscordService {

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) { }

    public async getUser(discordLink: IDiscordLink): Promise<APIUser> {
        const cachedUser = localStorage.getItem(DISCORD_USER_KEY);
        if (cachedUser) {
            return Promise.resolve(JSON.parse(cachedUser));
        }

        const user = await this.httpClient.get<APIUser>("https://discord.com/api/v9/users/@me", {
            headers: {
                "Authorization": `${discordLink.token_type} ${discordLink.access_token}`
            }
        }).toPromise();
        
        localStorage.setItem(DISCORD_USER_KEY, JSON.stringify(user));
        return user;
    }

    public getUserAvatar(user: APIUser): string {
        return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
    }

}
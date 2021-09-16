import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "../../../constants";
import { AccessToken } from "./models";

const ACCESS_TOKEN_KEY = "access_token";
const EXPIRATION_KEY = "access_token_expiration";

@Injectable({
    providedIn: "root"
})
export class AuthService {

    constructor(private httpClient: HttpClient) { }

    public setSession(accessToken: AccessToken): void {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken.token);
        localStorage.setItem(EXPIRATION_KEY, accessToken.expiration.toString());
    }

    public login(username: string, password: string): Observable<AccessToken> {
        return this.httpClient.post<AccessToken>(API_URL + "/auth/login", { username, password});
    }

    public logout(): void {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(EXPIRATION_KEY);
    }

    public isLoggedIn(): boolean {
        const timestamp = Math.floor(Date.now() / 1000);

        const expiration = localStorage.getItem(EXPIRATION_KEY);
        if (!expiration) {
            return false;
        }

        return parseInt(expiration) > timestamp;
    }
}

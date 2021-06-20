import { Injectable } from "@angular/core";
import { AccessToken } from "../models/accesstoken.model";

const ACCESS_TOKEN_KEY = "access_token";
const EXPIRATION_KEY = "access_token_expiration";

@Injectable({
    providedIn: "root"
})
export class AuthService {

    constructor() { }

    setSession(accessToken: AccessToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken.token);
        localStorage.setItem(EXPIRATION_KEY, accessToken.expiration.toString());
    }

    logout() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(EXPIRATION_KEY);
    }

    isLoggedIn(): boolean {
        const timestamp = Math.floor(Date.now() / 1000);

        let expiration = localStorage.getItem(EXPIRATION_KEY);
        if (!expiration) {
            return false;
        }

        return parseInt(expiration) > timestamp;
    }
}

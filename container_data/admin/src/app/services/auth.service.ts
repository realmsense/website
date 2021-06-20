import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class AuthService {

    constructor() { }

    setSession(accessToken: string) {
        // TODO: add expiry
        localStorage.setItem("access_token", accessToken);
    }

    logout() {
        localStorage.removeItem("access_token");
    }

    isLoggedIn() {
        return !!localStorage.getItem("access_token");
    }
}

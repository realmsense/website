import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUser, ENV, Permission } from "@realmsense/shared";
import { Observable } from "rxjs";
import { AlertModalComponent } from "../../components/alert-modal/alert-modal.component";
import { AccessToken } from "./models/accesstoken.model";

export const ACCESS_TOKEN_KEY = "access_token";
export const EXPIRATION_KEY = "access_token_expiration";
export const USER_KEY = "user";

@Injectable({
    providedIn: "root"
})
export class AuthService {

    private alertModal = AlertModalComponent.instance;

    constructor(private httpClient: HttpClient) { }

    public get user(): IUser {
        const userJSON = localStorage.getItem(USER_KEY) as string;
        return JSON.parse(userJSON);
    }

    public set user(user: IUser) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public login(username: string, password: string): Observable<AccessToken> {
        const req = this.httpClient.post<AccessToken>(ENV.URL.API + "/auth/login", { username, password });
        req.subscribe(this.handleLogin.bind(this));
        return req;
    }

    public register(username: string, password: string): Observable<void> {
        const req = this.httpClient.post<void>(ENV.URL.API + "/auth/register", { username, password });
        // req.subscribe(this.handleLogin.bind(this));
        return req;
    }

    public reloadUser(): Observable<IUser> {
        const user = this.httpClient.get<IUser>(ENV.URL.API + "/user/profile");
        user.subscribe((user) => localStorage.setItem(USER_KEY, JSON.stringify(user)));
        return user;
    }

    private handleLogin(accessToken: AccessToken): void {
        // Set session
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken.token);
        localStorage.setItem(EXPIRATION_KEY, accessToken.expiration.toString());

        // Set user profile
        this.reloadUser();
    }

    public logout(): void {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(EXPIRATION_KEY);
        localStorage.removeItem(USER_KEY);
        window.location.reload();
    }

    public changePassword(oldPassword: string, newPassword: string, repeatPassword: string): void {
        if (newPassword != repeatPassword) {
            this.alertModal.show("danger", "New password does not match");
            return;
        }

        this.httpClient.post<boolean>(ENV.URL.API + "/auth/changePassword", { oldPassword, newPassword })
            .subscribe((success) => {

                if (!success) {
                    this.alertModal.show("danger", "Incorrect old password");
                    return;
                }

                this.alertModal.show("success", "Password successfully changed, please login again.");
                setTimeout(this.logout.bind(this), 1500);
            });
    }

    public isLoggedIn(): boolean {
        const timestamp = Math.floor(Date.now() / 1000);

        const expiration = localStorage.getItem(EXPIRATION_KEY);
        if (!expiration) {
            return false;
        }

        return parseInt(expiration) > timestamp;
    }

    public isAdmin(): boolean {
        const adminPermissions = [Permission.MANAGE_USERS, Permission.MANAGE_BUILDS];
        const isAdmin = this.user?.permissions.some((permission) => adminPermissions.includes(permission));
        return isAdmin;
    }

    public isCustomer(): boolean {
        const customerPermissions = [Permission.TRACKER_ACCESS, Permission.BYPASS_SUBSCRIPTION];
        const isCustomer = this.user?.permissions.some((permission) => customerPermissions.includes(permission));
        return isCustomer;
    }
}

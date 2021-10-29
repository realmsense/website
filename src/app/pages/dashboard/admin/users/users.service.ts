import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ENV, IUser } from "../../../../../../shared/src";

@Injectable({
    providedIn: "root"
})
export class UsersService {

    constructor(private httpClient: HttpClient) { }

    public getUsers(): Observable<IUser[]> {
        return this.httpClient.get<IUser[]>(ENV.URL.API + "/user/all");
    }

    public register(username: string, password: string): Observable<void> {
        return this.httpClient.post<void>(ENV.URL.API + "/auth/register", {username, password});
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public updateUser(id: number, updatedUser: Partial<IUser>): Observable<void>{
        const params = new HttpParams()
            .append("id", id);

        return this.httpClient.put<void>(ENV.URL.API + "/user/update", updatedUser, {params});
    }
}

import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { ENVIRONMENT } from "../../../../environments/environment";
import { User } from "./models/user.model";

@Injectable({
    providedIn: "root"
})
export class UsersService {

    constructor(private httpClient: HttpClient) { }

    public getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(ENVIRONMENT.API_URL + "/user/all");
    }

    public register(username: string, password: string): Observable<void> {
        return this.httpClient.post<void>(ENVIRONMENT.API_URL + "/auth/register", {username, password});
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public updateUser(id: number, updatedUser: Partial<User>): Observable<void>{
        const params = new HttpParams()
            .append("id", id);

        return this.httpClient.put<void>(ENVIRONMENT.API_URL + "/user/update", updatedUser, {params});
    }
}
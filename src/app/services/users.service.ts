import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { API_URL } from "../models/constants";
import { User } from "../models/user.model";

@Injectable({
    providedIn: "root"
})
export class UsersService {

    constructor(private httpClient: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(API_URL + "/user/all");
    }

    register(username: string, password: string) {
        return this.httpClient.post(API_URL + "/auth/register", {username, password});
    }

    updateUser(id: number, updatedUser: Partial<User>) {
        const params = new HttpParams()
            .append("id", id);

        return this.httpClient.put(API_URL + "/user/update", updatedUser, {params});
    }
}

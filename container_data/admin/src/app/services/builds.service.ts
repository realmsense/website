import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Build } from "../models/build.model";
import { API_URL } from "../models/constants";

@Injectable({
    providedIn: "root"
})
export class BuildsService {

    constructor(private httpClient: HttpClient) { }

    getBuilds(): Observable<Build[]> {
        return this.httpClient.get<Build[]>(API_URL + "/builds/all");
    }
}

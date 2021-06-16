import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Build } from "../models/build.model";

@Injectable({
    providedIn: "root"
})
export class BuildsService {

    private apiUrl = "https://api.ri.extacy.cc/";

    constructor(private httpClient: HttpClient) { }

    getBuilds(): Observable<Build[]> {
        // TODO: needs authnetication
        const url = this.apiUrl + "/builds";
        return this.httpClient.get<Build[]>(url);
    }
}

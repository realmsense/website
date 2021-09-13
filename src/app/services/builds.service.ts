import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Build } from "../models/build.model";
import { BuildType } from "../models/buildType.model";
import { API_URL } from "../models/constants";
import { UploadedFileResponse } from "../models/uploadedFileResponse.model";

@Injectable({
    providedIn: "root"
})
export class BuildsService {

    constructor(private httpClient: HttpClient) { }

    getBuilds(): Observable<Build[]> {
        return this.httpClient.get<Build[]>(API_URL + "/builds/all");
    }

    getBuildTypes(): Observable<BuildType[]> {
        return this.httpClient.get<BuildType[]>(API_URL + "/builds/types");
    }

    getBuildType(name: string) {
        return this.httpClient.get(API_URL + "/builds/type", {params: {"name": name} });
    }

    uploadBuild(file: File) {
        const formData = new FormData();
        formData.append("file", file);

        const headers = new Headers()
        headers.append("Content-Type", "multipart/form-data")
        headers.append("Accept", file.type);

        return this.httpClient.put<UploadedFileResponse>(API_URL + "/builds/upload", formData);
    }

    createBuild(build: Omit<Build, "id" | "enabled">) {
        return this.httpClient.post<Build>(API_URL + "/builds/create", build);
    }

    announceBuild(build: Build, changelog: string) {
        const webhook = JSON.parse(
            build.type.embed_template
                .replace("{name}", build.name)
                .replace("{changelog}", changelog)
            );

        return this.httpClient.post(build.type.webhook_url, webhook);
    }

    createBuildType(buildType: BuildType) {
        return this.httpClient.post(API_URL + "/builds/createType", buildType);
    }
}

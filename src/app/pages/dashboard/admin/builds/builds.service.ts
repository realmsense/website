import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ENV } from "../../../../../../shared/src/constants/environment/environment";
import { UploadedFileResponse } from "../../../../models/uploadedFileResponse.model";
import { Build } from "./models/build.model";
import { BuildType } from "./models/buildType.model";

@Injectable({
    providedIn: "root"
})
export class BuildsService {

    constructor(private httpClient: HttpClient) { }

    public getBuilds(): Observable<Build[]> {
        return this.httpClient.get<Build[]>(ENV.URL.API + "/builds/all");
    }

    public getBuildTypes(): Observable<BuildType[]> {
        return this.httpClient.get<BuildType[]>(ENV.URL.API + "/builds/types");
    }

    public getBuildType(name: string): Observable<BuildType> {
        return this.httpClient.get<BuildType>(ENV.URL.API + "/builds/type", {params: {"name": name} });
    }

    public uploadBuild(file: File): Observable<UploadedFileResponse> {
        const formData = new FormData();
        formData.append("file", file);

        const headers = new Headers();
        headers.append("Content-Type", "multipart/form-data");
        headers.append("Accept", file.type);

        return this.httpClient.put<UploadedFileResponse>(ENV.URL.API + "/builds/upload", formData);
    }

    public createBuild(build: Omit<Build, "id" | "enabled">): Observable<Build> {
        return this.httpClient.post<Build>(ENV.URL.API + "/builds/create", build);
    }

    public announceBuild(build: Build, changelog: string): Observable<unknown> {
        const webhook = JSON.parse(
            build.type.embed_template
                .replace("{name}", build.name)
                .replace("{changelog}", changelog)
        );

        return this.httpClient.post(build.type.webhook_url, webhook);
    }

    public createBuildType(buildType: BuildType): Observable<BuildType> {
        return this.httpClient.post<BuildType>(ENV.URL.API + "/builds/createType", buildType);
    }
}

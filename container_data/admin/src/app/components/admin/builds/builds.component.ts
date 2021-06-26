import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Build } from "src/app/models/build.model";
import { BuildType } from "src/app/models/buildType.model";
import { BuildsService } from "src/app/services/builds.service";

@Component({
    selector: "app-builds",
    templateUrl: "./builds.component.html",
    styleUrls: ["./builds.component.scss", "../admin.component.scss"]
})
export class BuildsComponent implements OnInit {

    builds: Build[] = [];
    buildTypes: BuildType[] = [];

    createBuild: Omit<Build, "id"|"enabled">;
    createBuild_File: File;
    createBuild_Changelog: string;

    createBuildType: BuildType;

    constructor(private buildService: BuildsService) { }

    ngOnInit(): void {
        this.buildService.getBuilds().subscribe(builds => {
            this.builds = builds;
        });

        this.buildService.getBuildTypes().subscribe(types => {
            this.buildTypes = types;
            this.createBuild.type = this.buildTypes[0];
        });

        this.createBuildType = {
            name: "",
            webhook_url: "",
            embed_template: ""
        };

        this.createBuild = {
            name: "",
            type: JSON.parse(JSON.stringify(this.createBuildType)),
            file_path: "",
            file_size: 0
        };
    }

    private handleCreateTypeError(error: HttpErrorResponse) {
        return throwError(error.message);
    }

    createBuild_BtnClick() {

        if (
            this.createBuild.name == ""
            || this.createBuild.type.name == ""
            || this.createBuild_Changelog == ""
            || this.createBuild_File == null
        ) {
            console.log("Please enter all values for the Build");
            return;
        }

        this.buildService.uploadBuild(this.createBuild_File).subscribe(
            (uploadedFile) => {

                this.createBuild.file_path = uploadedFile.path;
                this.createBuild.file_size = uploadedFile.size;
                this.buildService.createBuild(this.createBuild)
                    .subscribe(
                        (createdBuild) => {
                            this.buildService.announceBuild(createdBuild, this.createBuild_Changelog).subscribe();
                            this.ngOnInit();
                        },
                        (error) => {
                            console.log(error);
                        }
                    )
            },

            (error) => {
                console.log(error);
            }
        );
    }

    onFileChange(event) {
        this.createBuild_File = event.target.files[0];
    }

    createBuildType_BtnClick() {
        if (
            this.createBuildType.name == ""
            || this.createBuildType.webhook_url == ""
            || this.createBuildType.embed_template == ""
        ) {
            console.log("Please enter all values for the Build Type");
            return;
        }

        this.buildService.createBuildType(this.createBuildType)
            .pipe(catchError(this.handleCreateTypeError.bind(this)))
            .subscribe(this.ngOnInit.bind(this));
    }
}

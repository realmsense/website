import { Component, OnInit } from "@angular/core";
import { UserProfileService } from "./user-profile.service";
import { IUser } from "@realmsense/types";
import { UtilService } from "../../../util.service";
import { AuthService } from "../../auth/auth.service";

@Component({
    selector: "app-user",
    templateUrl: "./user-profile.component.html",
    styleUrls: ["./user-profile.component.scss", "../dashboard.component.scss"]
})
export class UserProfileComponent implements OnInit {

    public userDetails = userDetails;
    public user: IUser;

    public oldPassword: string;
    public newPassword: string;
    public repeatPassword: string;

    constructor(
        public userProfileService: UserProfileService,
        public authService: AuthService,
        public utilService: UtilService
    ) { }

    public ngOnInit(): void {
        this.user = this.authService.user;
    }
}

interface UserDetail {
    name: string;
    value: string;
}

const userDetails: UserDetail[] = [
    {
        "name": "Username",
        "value": "Extacy"
    },
    {
        "name": "Email",
        "value": "admin@realmsense.cc"
    },
    // {
    //     "name": "Permissions",
    //     "value": "[]"
    // },
    {
        "name": "Created",
        "value": "12:39am 18/10/2021"
    },
];
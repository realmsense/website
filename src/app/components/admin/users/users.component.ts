import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Permission } from "src/app/models/permission";
import { User } from "src/app/models/user.model";
import { UsersService } from "src/app/services/users.service";

@Component({
    selector: "app-users",
    templateUrl: "./users.component.html",
    styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {

    public users: User[] = [];

    public currentUser: User;
    public currentPermissions: {
        [name: string]: boolean
    };

    constructor(
        private usersService: UsersService,
        private router: Router
    ) { }

    public ngOnInit(): void {
        this.usersService.getUsers().subscribe(users => {
            this.users = users;
        });

        this.currentPermissions = {};
        for (const permission in Permission) {
            this.currentPermissions[permission] = false;
        }
    }

    public async editPermissions(user: User): Promise<void> {
        this.currentUser = user;
    }

    public async savePermissions(): Promise<void> {
        this.currentUser.permissions = [];
        for (const [permission, enabled] of Object.entries(this.currentPermissions)) {
            if (enabled) {
                this.currentUser.permissions.push(Permission[permission]);
            }
        }

        this.usersService.updateUser(this.currentUser.id, this.currentUser)
            .subscribe(() => {
                this.ngOnInit();
            });
    }

    public permissionsStr(): string[] {
        return Object.keys(Permission);
    }
}

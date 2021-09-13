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

    users: User[] = [];

    currentUser: User;
    currentPermissions: { [name: string]: boolean };

    constructor(
        private usersService: UsersService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.usersService.getUsers().subscribe(users => {
            this.users = users;
        });

        this.currentPermissions = {};
        for (const permission in Permission) {
            this.currentPermissions[permission] = false;
        }
    }

    async editPermissions(user: User) {
        this.currentUser = user;
    }

    async savePermissions() {
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

    permissionsStr(): string[] {
        return Object.keys(Permission);
    }
}

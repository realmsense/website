import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsersService } from "./users.service";
import { Permission, IUser } from "@realmsense/types";

@Component({
    selector: "app-users",
    templateUrl: "./users.component.html",
    styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {

    public users: IUser[] = [];

    public editingUser: IUser;
    public editingPermissions: {
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

        this.editingPermissions = {};
        for (const permission in Permission) {
            this.editingPermissions[permission] = false;
        }
    }

    public async editPermissions(user: IUser): Promise<void> {
        this.editingUser = user;

        for (const permission of this.editingUser.permissions) {
            this.editingPermissions[permission] = true;
        }
    }

    public async savePermissions(): Promise<void> {
        this.editingUser.permissions = [];
        for (const [permission, enabled] of Object.entries(this.editingPermissions)) {
            if (enabled) {
                this.editingUser.permissions.push(Permission[permission]);
            }
        }

        this.usersService.updateUser(this.editingUser.id, this.editingUser)
            .subscribe(() => {
                this.ngOnInit();
            });
    }

    public permissionsStr(): string[] {
        return Object.keys(Permission);
    }
}

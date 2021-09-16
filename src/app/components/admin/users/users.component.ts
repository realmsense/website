import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Permission } from "src/app/components/auth/models/permission";
import { User } from "src/app/components/admin/users/models/user.model";
import { UsersService } from "src/app/components/admin/users/users.service";

@Component({
    selector: "app-users",
    templateUrl: "./users.component.html",
    styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {

    public users: User[] = [];

    public editingUser: User;
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

    public async editPermissions(user: User): Promise<void> {
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

import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IUser, Permission } from "@realmsense/shared";
import { AuthService } from "../../../auth/auth.service";
import { UsersService } from "./users.service";

@Component({
    selector: "app-users",
    templateUrl: "./users.component.html",
    styleUrls: ["./users.component.scss", "../../dashboard.component.scss"]
})
export class UsersComponent implements OnInit {

    public users: IUser[] = [];

    public editingUser: IUser;
    public editingPermissions: {
        [name: string]: boolean
    };

    public closeResult = "";

    constructor(
        private usersService: UsersService,
        private authService: AuthService,
        private modalService: NgbModal
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

    public async editPermissions(content, user: IUser): Promise<void> {
        this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
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

        if (this.editingUser.id == this.authService.user.id) {
            this.authService.user = this.editingUser;
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

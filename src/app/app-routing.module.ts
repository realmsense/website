import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/auth/login/login.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { BuildsComponent } from "./pages/dashboard/admin/builds/builds.component";
import { LogsComponent } from "./pages/dashboard/admin/logs/logs.component";
import { UsersComponent } from "./pages/dashboard/admin/users/users.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { PlayersComponent } from "./pages/dashboard/tracker/players/players.component";
import { RealmsComponent } from "./pages/dashboard/tracker/realms/realms.component";
import { LinkDiscordComponent } from "./pages/dashboard/user-profile/link-discord/link-discord.component";
import { UserProfileComponent } from "./pages/dashboard/user-profile/user-profile.component";
import { DashboardHomeComponent } from "./pages/dashboard/welcome/dashboard-home.component";
import { HomeComponent } from "./pages/home/home.component";
import { TOSComponent } from "./pages/tos/tos.component";

const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "tos", component: TOSComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    {
        path: "dashboard", component: DashboardComponent,
        children: [
            { path: "", component: DashboardHomeComponent },
            { path: "profile", component: UserProfileComponent },
            { path: "profile/link-discord", component: LinkDiscordComponent },
            { path: "admin/builds", component: BuildsComponent },
            { path: "admin/users", component: UsersComponent },
            { path: "admin/logs", component: LogsComponent },
            { path: "tracker/realms", component: RealmsComponent },
            { path: "tracker/players", component: PlayersComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

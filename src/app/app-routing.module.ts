import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/auth/login/login.component";
import { BuildsComponent } from "./components/dashboard/admin/builds/builds.component";
import { UsersComponent } from "./components/dashboard/admin/users/users.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { RealmsComponent } from "./components/dashboard/tracker/realms/realms.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full"},
    { path: "home", component: HomeComponent},
    { path: "login", component: LoginComponent},
    {
        path: "dashboard", component: DashboardComponent,
        children: [
            { path: "admin/builds", component: BuildsComponent },
            { path: "admin/users", component: UsersComponent },
            { path: "tracker/realms", component: RealmsComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

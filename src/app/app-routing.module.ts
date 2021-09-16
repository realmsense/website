import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/auth/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { BuildsComponent } from "./components/dashboard/builds/builds.component";
import { UsersComponent } from "./components/dashboard/users/users.component";
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
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

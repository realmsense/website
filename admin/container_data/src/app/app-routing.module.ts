import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./components/admin/admin.component";
import { BuildsComponent } from "./components/admin/builds/builds.component";
import { UsersComponent } from "./components/admin/users/users.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full"},
    { path: "home", component: HomeComponent},
    { path: "login", component: LoginComponent},
    {
        path: "admin", component: AdminComponent,
        children: [
            { path: "builds", component: BuildsComponent },
            { path: "users", component: UsersComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

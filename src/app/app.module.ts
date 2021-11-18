import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CardsComponent } from "./components/card/card.component";
import { AlertModalComponent } from "./components/alert-modal/alert-modal.component";
import { CopyClipboardDirective } from "./directives/copy-clipboard-directive";
import { AuthInterceptor } from "./pages/auth/auth.interceptor";
import { HttpErrorInterceptor } from "./pages/auth/http-error.interceptor";
import { LoginComponent } from "./pages/auth/login/login.component";
import { BuildsComponent } from "./pages/dashboard/admin/builds/builds.component";
import { UsersComponent } from "./pages/dashboard/admin/users/users.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { PlayersComponent } from "./pages/dashboard/tracker/players/players.component";
import { RealmsComponent } from "./pages/dashboard/tracker/realms/realms.component";
import { LinkDiscordComponent } from "./pages/dashboard/user-profile/link-discord/link-discord.component";
import { UserProfileComponent } from "./pages/dashboard/user-profile/user-profile.component";
import { DashboardHomeComponent } from "./pages/dashboard/welcome/dashboard-home.component";
import { HomeComponent } from "./pages/home/home.component";
import { TOSComponent } from "./pages/tos/tos.component";
import { RegisterComponent } from "./pages/auth/register/register.component";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        TOSComponent,
        DashboardComponent,
        DashboardHomeComponent,
        UserProfileComponent,
        BuildsComponent,
        LoginComponent,
        RegisterComponent,
        UsersComponent,
        AlertModalComponent,
        RealmsComponent,
        PlayersComponent,
        CopyClipboardDirective,
        CardsComponent,
        LinkDiscordComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        NgbModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { AuthInterceptor } from "./components/auth/auth.interceptor";
import { HttpErrorInterceptor } from "./components/auth/http-error.interceptor";
import { LoginComponent } from "./components/auth/login/login.component";
import { ErrorModalComponent } from "./components/error-modal/error-modal.component";
import { HomeComponent } from "./components/home/home.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { BuildsComponent } from "./components/dashboard/admin/builds/builds.component";
import { UsersComponent } from "./components/dashboard/admin/users/users.component";
import { RealmsComponent } from "./components/dashboard/tracker/realms/realms.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CopyClipboardDirective } from "./directives/copy-clipboard-directive";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DashboardComponent,
        BuildsComponent,
        HeaderComponent,
        LoginComponent,
        UsersComponent,
        ErrorModalComponent,
        RealmsComponent,
        CopyClipboardDirective
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

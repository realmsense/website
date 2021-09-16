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
import { BuildsComponent } from "./components/dashboard/builds/builds.component";
import { UsersComponent } from "./components/dashboard/users/users.component";

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
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

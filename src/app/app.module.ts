import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AdminComponent } from "./components/admin/admin.component";
import { BuildsComponent } from "./components/admin/builds/builds.component";
import { HeaderComponent } from "./components/admin/header/header.component";
import { UsersComponent } from "./components/admin/users/users.component";
import { AuthInterceptor } from "./components/auth/auth.interceptor";
import { HttpErrorInterceptor } from "./components/auth/http-error.interceptor";
import { LoginComponent } from "./components/auth/login/login.component";
import { ErrorModalComponent } from "./components/error-modal/error-modal.component";
import { HomeComponent } from "./components/home/home.component";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AdminComponent,
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

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { AdminComponent } from "./components/admin/admin.component";
import { BuildsComponent } from "./components/admin/builds/builds.component";
import { HeaderComponent } from "./components/admin/header/header.component";
import { LoginComponent } from "./components/login/login.component";
import { HTTP_INTERCEPTOR_PROVIDERS } from "./interceptors";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AdminComponent,
        BuildsComponent,
        HeaderComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [
        HTTP_INTERCEPTOR_PROVIDERS
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

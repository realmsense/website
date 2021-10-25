import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { ENV } from "../shared/src/constants/environment/environment";
import { AppModule } from "./app/app.module";

if (ENV.Production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));

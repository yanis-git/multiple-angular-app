import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app1/app.module';

if (process.env && process.env.ENV === 'prod') {
    enableProdMode();
}
platformBrowserDynamic()
    .bootstrapModule(AppModule, { preserveWhitespaces: false })
    .then(()=>{})
    .catch((e) => console.log(e));

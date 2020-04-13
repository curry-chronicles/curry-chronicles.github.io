
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { enableProdMode, LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
	enableProdMode();
}

registerLocaleData(localeFr, 'fr-FR');
platformBrowserDynamic(
	[{
		provide: LOCALE_ID,
		useValue: 'fr-FR'
	}])
	.bootstrapModule(AppModule)
	.catch(err => console.error(err));

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/app-routing.module';

export const DateFormat = {
	parse: {
		dateInput: 'input',
	},
	display: {
		dateInput: 'DD-MMM-YYYY',
		monthYearLabel: 'MMMM YYYY',
		dateA11yLabel: 'MM/DD/YYYY',
		monthYearA11yLabel: 'MMMM YYYY',
	}
};

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,

		MatButtonModule,
		MatIconModule,
		MatToolbarModule,
		MatTooltipModule
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

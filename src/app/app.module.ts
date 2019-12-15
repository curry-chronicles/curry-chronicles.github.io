import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesService } from './infra';
import { HomeComponent, IngredientsListComponent, RecipeComponent } from './ui';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		RecipeComponent,
		IngredientsListComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		MatMenuModule,
		MatButtonModule,
		MatIconModule,
		MatToolbarModule,
		MatProgressSpinnerModule,
		MatCardModule,
		MatGridListModule,
		MatListModule,
		BrowserAnimationsModule
	],
	providers: [
		RecipesService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

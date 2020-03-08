import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesService } from './infra';
import { DirectionsListComponent, HomeComponent, IngredientsListComponent, RecipeComponent, RecipeHeaderComponent, AdminComponent, RecipeEditionComponent } from './ui';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		RecipeComponent,
		IngredientsListComponent,
		DirectionsListComponent,
		RecipeHeaderComponent,
		// Admin components
		AdminComponent,
		RecipeEditionComponent
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
		BrowserAnimationsModule,
		ReactiveFormsModule,
		FormlyModule.forRoot(),
		FormlyMaterialModule
	],
	providers: [
		RecipesService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

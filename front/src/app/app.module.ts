import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesService } from './infra';
import { AdminComponent, AutofocusOnShowDirective, CURRY_CHRONICLES_FORMLY_CONFIG, DirectionsComponent, DirectionsEditorComponent, DirectionsListComponent, HomeComponent, IngredientsComponent, IngredientsEditorComponent, IngredientsListComponent, RecipeComponent, RecipeEditionComponent, RecipeHeaderComponent, TimespanComponent, TimespanEditorComponent } from './ui';

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
		RecipeEditionComponent,

		// Custom formly components
		TimespanComponent,
		TimespanEditorComponent,
		IngredientsComponent,
		IngredientsEditorComponent,
		DirectionsComponent,
		DirectionsEditorComponent,

		// Directives
		AutofocusOnShowDirective
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
		MatFormFieldModule,
		MatInputModule,
		MatBadgeModule,
		DragDropModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		FormlyModule.forRoot(CURRY_CHRONICLES_FORMLY_CONFIG),
		FormlyMaterialModule,
		FormsModule
	],
	providers: [
		RecipesService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

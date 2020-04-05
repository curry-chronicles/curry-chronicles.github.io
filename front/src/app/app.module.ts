import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesService } from './infra';
import { AdminComponent, AutofocusOnShowDirective, CURRY_CHRONICLES_FORMLY_CONFIG, DirectionsComponent, DirectionsEditorComponent, DirectionsListComponent, HomeComponent, IngredientsComponent, IngredientsEditorComponent, IngredientsListComponent, RecipeComponent, RecipeEditionComponent, RecipeHeaderComponent, TimespanComponent, TimespanEditorComponent, PictureComponent, PictureEditorComponent, FileValueAccessorDirective } from './ui';

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
		PictureComponent,
		PictureEditorComponent,

		// Directives
		AutofocusOnShowDirective,
		FileValueAccessorDirective
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

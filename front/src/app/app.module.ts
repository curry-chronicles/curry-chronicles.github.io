import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { AppComponent } from './app.component';
import { AuthenticationService, RecipesService, ImgurService } from './infra';
import { AppRoutingModule } from './routing/app-routing.module';
import { AdminComponent, AutofocusOnShowDirective, CURRY_CHRONICLES_FORMLY_CONFIG, DateComponent, DirectionsComponent, DirectionsEditorComponent, DirectionsListComponent, FileValueAccessorDirective, HomeComponent, IngredientsComponent, IngredientsEditorComponent, IngredientsListComponent, LoginComponent, PictureComponent, PictureEditorComponent, RecipeComponent, RecipeEditionComponent, RecipeHeaderComponent, RecipeThumbnailComponent, TimespanComponent, TimespanEditorComponent, TimespanPipe, DialogDeleteComponent } from './ui';
import { InfiniteScrollComponent } from './ui/infinite-scroll';
import { MatDialogModule } from '@angular/material/dialog';

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
		HomeComponent,
		RecipeThumbnailComponent,
		RecipeComponent,
		IngredientsListComponent,
		DirectionsListComponent,
		RecipeHeaderComponent,

		// Admin components
		LoginComponent,
		AdminComponent,
		RecipeEditionComponent,
		DialogDeleteComponent,

		// Custom formly components
		TimespanComponent,
		TimespanEditorComponent,
		IngredientsComponent,
		IngredientsEditorComponent,
		DirectionsComponent,
		DirectionsEditorComponent,
		PictureComponent,
		PictureEditorComponent,
		DateComponent,

		// Directives
		AutofocusOnShowDirective,
		FileValueAccessorDirective,

		// Pipes
		TimespanPipe,

		// Helpers
		InfiniteScrollComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		MatButtonModule,
		MatIconModule,
		MatToolbarModule,
		MatProgressSpinnerModule,
		MatCardModule,
		MatGridListModule,
		MatListModule,
		MatInputModule,
		MatBadgeModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatExpansionModule,
		MatTooltipModule,
		DragDropModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		FormlyModule.forRoot(CURRY_CHRONICLES_FORMLY_CONFIG),
		FormlyMaterialModule,
		FormsModule,
		MatDialogModule,
	],
	entryComponents: [
		DialogDeleteComponent
	],
	providers: [
		RecipesService,
		AuthenticationService,
		ImgurService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

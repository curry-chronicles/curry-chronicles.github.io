import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, RecipeResolver, SharedModule } from '@curry-chronicles/shared';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { CURRY_CHRONICLES_FORMLY_CONFIG, DateComponent, DirectionsComponent, DirectionsEditorComponent, IngredientsComponent, IngredientsEditorComponent, PictureComponent, PictureEditorComponent, TimespanComponent, TimespanEditorComponent } from './forms';
import { RecipeEditionComponent } from './recipe-edition.component';

const routes: Routes = [
	{
		path: '',
		component: RecipeEditionComponent,
		resolve: {
			recipe: RecipeResolver
		},
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		FormlyModule.forRoot(CURRY_CHRONICLES_FORMLY_CONFIG),
		FormlyMaterialModule,
		MatFormFieldModule,
		MatIconModule,
		DragDropModule,
		MatListModule,
		MatExpansionModule,
		MatNativeDateModule,
		MatDatepickerModule,
		MatBadgeModule,
		MatSnackBarModule,
		MatInputModule,
		MatButtonModule
	],
	declarations: [
		RecipeEditionComponent,

		DateComponent,
		DirectionsComponent,
		IngredientsComponent,
		PictureComponent,
		TimespanComponent,

		DirectionsEditorComponent,
		IngredientsEditorComponent,
		PictureEditorComponent,
		TimespanEditorComponent
	]
})
export class RecipeEditionModule { }

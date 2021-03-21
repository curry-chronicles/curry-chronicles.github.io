import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Routes } from '@angular/router';
import { RecipesPageResolver, SharedModule } from '@curry-chronicles/shared';
import { RecipeThumbnailComponent } from './components';
import { HomeComponent } from './home.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		resolve: {
			recipesPage: RecipesPageResolver
		}
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CommonModule,
		SharedModule,
		MatIconModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		MatProgressSpinnerModule,
		MatDialogModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		HomeComponent,
		RecipeThumbnailComponent
	],
	providers: [
		RecipesPageResolver
	]
})
export class HomeModule { }
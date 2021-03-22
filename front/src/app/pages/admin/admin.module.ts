import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';
import { RecipesPageResolver, SharedModule } from '@curry-chronicles/shared';
import { AdminComponent } from './admin.component';

const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
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
		MatDialogModule,
		MatSnackBarModule
	],
	declarations: [
		AdminComponent
	]
})
export class AdminModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { RecipeResolver, SharedModule } from '@curry-chronicles/shared';
import { DirectionsListComponent, IngredientsListComponent, RecipeComponent, RecipeHeaderComponent } from './components';
import { IngredientPipe, TimespanPipe } from './pipes';

const routes: Routes = [
	{
		path: '',
		component: RecipeComponent,
		resolve: {
			recipe: RecipeResolver
		}
	}
]

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CommonModule,
		SharedModule,
		MatIconModule,
		MatCardModule
	],
	declarations: [
		IngredientPipe,
		TimespanPipe,

		DirectionsListComponent,
		IngredientsListComponent,
		RecipeHeaderComponent,
		RecipeComponent
	]
})
export class RecipeModule { }
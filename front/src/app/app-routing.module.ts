import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent, HomeComponent, RecipeEditionComponent } from './ui';
import { RecipeComponent } from './ui/recipe';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'admin',
		children: [
			{
				path: '',
				component: AdminComponent
			},
			{
				path: 'add-recipe',
				component: RecipeEditionComponent
			}
		]
	},
	{
		path: ':recipeId',
		component: RecipeComponent
	}
];

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule.forRoot(
			routes,
			{
				useHash: true
			}
		)
	],
	exports: [RouterModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule { }

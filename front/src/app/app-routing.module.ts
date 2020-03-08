import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent, AdminComponent, RecipeEditionComponent } from './ui';
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
		MatMenuModule,
		RouterModule.forRoot(routes, { useHash: true })
	],
	exports: [RouterModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule { }

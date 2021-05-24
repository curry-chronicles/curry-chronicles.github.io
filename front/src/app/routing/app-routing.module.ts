import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('../pages/home').then(m => m.HomeModule)
	},
	{
		path: 'login',
		loadChildren: () => import('../pages/login').then(m => m.LoginModule)
	},
	{
		path: 'admin',
		loadChildren: () => import('../pages/admin').then(m => m.AdminModule)
	},
	{
		path: 'admin/add-recipe',
		loadChildren: () => import('../pages/recipe-edition').then(m => m.RecipeEditionModule)
	},
	{
		path: 'admin/edit/:recipeId',
		loadChildren: () => import('../pages/recipe-edition').then(m => m.RecipeEditionModule)
	},
	{
		path: ':recipeId',
		loadChildren: () => import('../pages/recipe').then(m => m.RecipeModule)
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(
			routes,
			{
				useHash: true,
				scrollPositionRestoration: 'enabled',
				relativeLinkResolution: 'legacy'
			}
		)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }

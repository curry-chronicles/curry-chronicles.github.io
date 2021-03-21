import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent, HomeComponent, LoginComponent, RecipeComponent, RecipeEditionComponent } from '../ui';
import { AuthGuard } from './auth.guard';
import { RecipeResolver } from './recipe.resolver';
import { RecipesPageResolver } from './recipes-page.resolver';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		resolve: {
			recipesPage: RecipesPageResolver
		}
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'admin',
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				component: AdminComponent,
				resolve: {
					recipesPage: RecipesPageResolver
				}
			},
			{
				path: 'add-recipe',
				component: RecipeEditionComponent
			},
			{
				path: 'edit-recipe',
				children: [
					{
						path: '',
						pathMatch: 'full',
						redirectTo: '/admin'
					},
					{
						path: ':recipeId',
						component: RecipeEditionComponent,
						resolve: {
							recipe: RecipeResolver
						}
					},
				]
			}
		]
	},
	{
		path: ':recipeId',
		component: RecipeComponent,
		resolve: {
			recipe: RecipeResolver
		}
	}
];

@NgModule({
	imports: [
		BrowserAnimationsModule,
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
	],
	providers: [
		AuthGuard,
		RecipeResolver,
		RecipesPageResolver
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule { }

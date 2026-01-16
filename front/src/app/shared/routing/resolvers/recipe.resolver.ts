import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IRecipe } from './../../models';
import { RecipesService } from './../../services';

@Injectable()
export class RecipeResolver implements Resolve<IRecipe> {
	constructor(
		private readonly recipesService: RecipesService,
		private readonly router: Router
	) { }

	public resolve(route: ActivatedRouteSnapshot, _: RouterStateSnapshot): Observable<IRecipe> {
		const recipeId = route?.params?.recipeId as string;
		if (recipeId == null) {
			return of(null);
		}
		return this.recipesService.getRecipeById(recipeId).pipe(
			tap(recipe => {
				if (recipe == null) {
					this.router.navigateByUrl('');
				}
			})
		);
	}
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RecipesService } from '@curry-chronicles/infra';
import { IRecipe } from '@curry-chronicles/models';

@Injectable()
export class RecipeResolver implements Resolve<IRecipe> {
	constructor(
		private recipesService: RecipesService,
		private router: Router
	) { }

	public resolve(route: ActivatedRouteSnapshot, _: RouterStateSnapshot): Observable<IRecipe> {
		const recipeId = route?.params?.recipeId as string;
		if (recipeId == null) {
			this.router.navigateByUrl('/');
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

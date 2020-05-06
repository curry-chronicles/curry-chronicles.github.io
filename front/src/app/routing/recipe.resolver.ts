import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RecipesService } from '../infra';
import { IRecipe } from '../models';

@Injectable()
export class RecipeResolver {
	constructor(
		private recipeService: RecipesService,
		private router: Router
	) { }

	public resolve(route: ActivatedRouteSnapshot, _: RouterStateSnapshot): Observable<IRecipe> {
		const recipeId = route?.params?.recipeId as string;
		if (recipeId == null) {
			this.router.navigateByUrl('/');
			return of(null);
		}
		return this.recipeService.getRecipeById(recipeId).pipe(
			tap(recipe => {
				if (recipe == null) {
					this.router.navigateByUrl('');
				}
			})
		);
	}
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IRecipeOverview, Page } from '../models';
import { RecipesService } from '../services';

@Injectable()
export class RecipesPageResolver implements Resolve<Page<IRecipeOverview>> {
	constructor(
		private recipesService: RecipesService,
	) { }

	public resolve(_: ActivatedRouteSnapshot, __: RouterStateSnapshot): Observable<Page<IRecipeOverview>> {
		return this.recipesService.getPagedRecipes();
	}
}

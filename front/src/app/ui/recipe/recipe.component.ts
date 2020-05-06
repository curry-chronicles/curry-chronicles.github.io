import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { IRecipe } from '../../models';

@Component({
	selector: 'app-recipe',
	templateUrl: './recipe.component.html',
	styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {

	public recipe: IRecipe;

	constructor(
		private router: Router,
		private route: ActivatedRoute
	) {
		this.router.events.pipe(
			filter(event => event instanceof NavigationEnd),
			switchMap(() => this.route.data),
			map(data => data?.recipe as IRecipe),
			filter(recipe => recipe != null),
		).subscribe(recipe => {
			this.recipe = recipe;
		});
	}
}

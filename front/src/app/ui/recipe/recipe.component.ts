import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRecipe } from '../../models';

@Component({
	selector: 'app-recipe',
	templateUrl: './recipe.component.html',
	styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {

	public recipe: IRecipe;

	constructor(
		private route: ActivatedRoute
	) {
		this.recipe = this.route.snapshot.data.recipe as IRecipe;
	}
}

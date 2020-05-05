import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../infra';
import { IRecipe } from '../../models';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-recipe',
	templateUrl: './recipe.component.html',
	styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

	public recipe$: Observable<IRecipe>;

	constructor(
		private recipesService: RecipesService,
		private route: ActivatedRoute
	) { }

	public ngOnInit(): void {
		this.recipe$ = this.recipesService.getRecipe(this.route.snapshot.paramMap.get('recipeId')).pipe(
			map(r => {
				r.preparationTime = '02:02:00'
				return r;
			})
		);
	}
}

import { Component } from '@angular/core';
import { RecipesService } from '../../infra';
import { IRecipeOverview } from '../../models';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {

	public overviews: IRecipeOverview[];

	constructor(private recipesService: RecipesService) {
		this.recipesService.getRecipesOverviews().subscribe(overviews => {
			this.overviews = overviews;
		});
	}
}

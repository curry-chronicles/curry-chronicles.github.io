import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../infra';
import { IRecipeOverview } from '../../models';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public overviews$: Observable<IRecipeOverview[]>;

	constructor(
		private recipesService: RecipesService
	) { }

	public ngOnInit(): void {
		this.overviews$ = this.recipesService.getRecipesOverviews();
	}
}

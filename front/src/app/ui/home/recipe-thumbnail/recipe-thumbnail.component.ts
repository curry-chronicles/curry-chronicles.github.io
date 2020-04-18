import { Component, OnInit, Input } from '@angular/core';
import { IRecipeOverview } from '../../../models';

@Component({
	selector: 'app-recipe-thumbnail',
	templateUrl: './recipe-thumbnail.component.html',
	styleUrls: ['./recipe-thumbnail.component.scss']
})
export class RecipeThumbnailComponent implements OnInit {
	@Input()
	public recipe: IRecipeOverview;

	public ngOnInit(): void {
		if (this.recipe == null) {
			throw new Error('Input "recipe" is mandatory');
		}
	}
}

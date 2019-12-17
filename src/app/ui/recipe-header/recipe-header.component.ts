import { Component, Input } from "@angular/core";
import { IRecipe } from '../../models';

@Component({
	selector: 'app-recipe-header',
	templateUrl: './recipe-header.component.html',
	styleUrls: ['./recipe-header.component.scss']
})
export class RecipeHeaderComponent {
	@Input()
	public recipe: IRecipe;
}

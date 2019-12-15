import { Component, Input } from "@angular/core";
import { IIngredient } from '../../models';

@Component({
	selector: 'app-ingredients-list',
	templateUrl: './ingredients-list.component.html',
	styleUrls: ['./ingredients-list.component.scss']
})
export class IngredientsListComponent {
	@Input()
	public ingredients: IIngredient[];
}

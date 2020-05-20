import { Component, Input } from '@angular/core';
import { IIngredient } from '@curry-chronicles/models';

@Component({
	selector: 'app-ingredients-list',
	templateUrl: './ingredients-list.component.html',
	styleUrls: ['./ingredients-list.component.scss']
})
export class IngredientsListComponent {
	@Input()
	public ingredients: IIngredient[];
}

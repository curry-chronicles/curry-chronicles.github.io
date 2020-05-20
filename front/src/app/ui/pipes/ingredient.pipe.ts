import { Pipe, PipeTransform } from '@angular/core';
import { IIngredient } from '@curry-chronicles/models';

@Pipe({
	name: 'ingredient'
})
export class IngredientPipe implements PipeTransform {
	public transform(ingredient: IIngredient): string {
		if (ingredient == null) {
			return '';
		}

		if (ingredient.unit != null && ingredient.amount != null) {
			return `${ingredient.amount}${ingredient.unit.length > 2 ? ' ' : ''}${ingredient.unit} ${ingredient.name}`;
		}

		if (ingredient.amount != null) {
			return `${ingredient.amount} ${ingredient.name}`;
		}

		if (ingredient.unit != null) {
			return `${ingredient.unit} ${ingredient.name}`;
		}

		return ingredient.name;
	}
}

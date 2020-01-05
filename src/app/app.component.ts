import { Component } from '@angular/core';

const RANDOM_INGREDIENTS = [
	'un gros poulet',
	'un gros steak',
	'un gros couteau',
	'un gros couteau d\'anniversaire',
	'beaucoup d\'oignons',
	'du bœuf à la fraise',
	'élégance',
	'du pif',
	'c\'est tout',
	'Angular',
	'Jean-Pierre Coffe',
	'le fantôme de Jean-Pierre Coffe',
	'Patrick Etchebest',
	'ma maman',
	'de la bière',
	'beaucoup de bière',
	'surtout de la bière'
];

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public title = 'Curry Chronicles';

	private randomIngredientIndex: number;
	public randomIngredient: string;

	constructor() {
		this.generateRandomIngredient();
	}

	public generateRandomIngredient(): void {
		let index = Math.floor(Math.random() * RANDOM_INGREDIENTS.length);
		if (index === this.randomIngredientIndex) {
			index = index > (RANDOM_INGREDIENTS.length - 1) ? index - 1 : index + 1;
		}
		this.randomIngredientIndex = index;
		this.randomIngredient = RANDOM_INGREDIENTS[this.randomIngredientIndex];
	}
}

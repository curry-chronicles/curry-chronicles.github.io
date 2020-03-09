import { Component } from "@angular/core";
import { IRecipe } from 'src/app/models';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { nameof } from 'src/app/utils';

@Component({
	selector: 'app-recipe-edition',
	templateUrl: './recipe-edition.component.html',
	styleUrls: ['./recipe-edition.component.scss']
})
export class RecipeEditionComponent {

	public form: FormGroup;
	public model: IRecipe;
	public fields: FormlyFieldConfig[];

	public get canSubmit(): boolean {
		return this.form.valid && this.form.touched;
	}

	constructor() {

		this.form = new FormGroup({});

		this.model = {
			preparationTime: '00:60:00',
			ingredients: [],
			directions: []
		} as IRecipe;

		this.fields = [
			{
				key: nameof<IRecipe>('name'),
				type: 'input',
				templateOptions: {
					label: 'Nom',
					placeholder: 'Nom de la recette',
					required: true
				}
			},
			{
				key: nameof<IRecipe>('servesHowManyPeople'),
				type: 'input',
				templateOptions: {
					type: 'number',
					label: 'Nombre de personnes',
					placeholder: 'Pour combien de personnes',
					required: true
				}
			},
			{
				key: nameof<IRecipe>('preparationTime'),
				type: 'timespan',
				templateOptions: {
					label: 'Temps de préparation',
					required: true
				}
			}
		];
	}

	public submit(): void {
		console.log(this.model);
	}
}

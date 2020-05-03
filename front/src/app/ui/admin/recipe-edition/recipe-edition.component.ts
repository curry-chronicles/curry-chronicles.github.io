import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { RecipesService } from '../../../infra';
import { IRecipe } from '../../../models';
import { nameof } from '../../../utils';

@Component({
	selector: 'app-recipe-edition',
	templateUrl: './recipe-edition.component.html',
	styleUrls: ['./recipe-edition.component.scss']
})
export class RecipeEditionComponent {

	@ViewChild('jsonRecipeTextArea')
	public jsonRecipeTextArea: ElementRef<HTMLTextAreaElement>;
	public showCopySuccessMessage = false;

	public form: FormGroup;
	public model: IRecipe;
	public fields: FormlyFieldConfig[];

	public get canSubmit(): boolean {
		return this.form.valid && this.form.touched;
	}

	constructor(
		private recipesService: RecipesService
	) {
		this.form = new FormGroup({});
		this.model = {
			ingredients: [
				{ name: '' }
			],
			directions: [
				{ description: '' }
			]
		} as IRecipe;

		this.recipesService.getAllRecipeIds().subscribe(existingRecipeIds => {
			this.fields = [
				{
					key: nameof<IRecipe>('name'),
					type: 'input',
					templateOptions: {
						label: 'Nom',
						appearance: 'outline',
						placeholder: 'Nom de la recette',
						required: true
					}
				},
				{
					key: nameof<IRecipe>('id'),
					type: 'input',
					templateOptions: {
						label: 'Identifiant',
						placeholder: 'URL de la recette',
						appearance: 'outline',
						required: true
					},
					validators: {
						// Check if the Id does not already exist
						'RECIPE_ID_ALREADY_EXISTS': {
							message: 'Cet Id de recette existe déjà',
							expression: (control: AbstractControl): boolean => {
								const recipeId = (control.value as string)?.toLocaleLowerCase();
								if (recipeId == null) {
									return true;
								}
								const result = existingRecipeIds.has(recipeId) ? false : true;
								return result;
							}
						}
					}
				},
				{
					key: nameof<IRecipe>('headLine'),
					type: 'textarea',
					templateOptions: {
						label: 'En tête',
						placeholder: 'Description succincte visible sur la page d\'accueil',
						appearance: 'outline',
						rows: 2,
						required: true
					}
				},
				{
					key: nameof<IRecipe>('description'),
					type: 'textarea',
					templateOptions: {
						label: 'Description',
						placeholder: 'Description complète de la recette',
						appearance: 'outline',
						rows: 5,
						required: true
					}
				},
				{
					key: nameof<IRecipe>('publicationDate'),
					type: 'date',
					templateOptions: {
						label: 'Date de publication',
						required: true
					}
				},
				{
					key: nameof<IRecipe>('servesHowManyPeople'),
					type: 'input',
					templateOptions: {
						type: 'number',
						appearance: 'outline',
						label: 'Nombre de personnes',
						placeholder: 'Pour combien de personnes',
						required: true
					}
				},
				{
					key: nameof<IRecipe>('mainPicture'),
					type: 'picture',
					templateOptions: {
						label: 'Image principale',
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
				},
				{
					key: nameof<IRecipe>('cookingTime'),
					type: 'timespan',
					templateOptions: {
						label: 'Temps de cuisson',
						required: true
					}
				},
				{
					key: nameof<IRecipe>('ingredients'),
					type: 'ingredients',
					templateOptions: {
						label: 'Ingrédients',
						required: true
					}
				},
				{
					key: nameof<IRecipe>('directions'),
					type: 'directions',
					templateOptions: {
						label: 'Étapes',
						required: true
					}
				}
			];
		});
	}

	public submit(): void {
		console.log(this.model);
	}

	public copyToClipboard(): void {
		this.jsonRecipeTextArea.nativeElement.hidden = false;
		this.jsonRecipeTextArea.nativeElement.select();
		document.execCommand('copy');
		this.showCopySuccessMessage = true;
		this.jsonRecipeTextArea.nativeElement.hidden = true;
		setTimeout(() => {
			this.showCopySuccessMessage = false;
		}, 2000);
	}
}

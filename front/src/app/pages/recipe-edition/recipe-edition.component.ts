import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IRecipe, nameof, RecipesService } from '@curry-chronicles/shared';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';

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
		return this.form.valid && this.form.touched && !this.isSaving;
	}

	public isSaving = false;
	public error: string;
	public recipe: IRecipe;
	public isCreation: boolean;

	constructor(
		private recipesService: RecipesService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private snackBar: MatSnackBar
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

		this.recipe = this.activatedRoute.snapshot.data.recipe as IRecipe;
		if (this.recipe != null) {
			this.model = this.recipe;
			this.isCreation = false;
		} else {
			this.isCreation = true;
		}

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
						required: true,
						disabled: !this.isCreation
					},
					validators: {
						// Check if the Id does not already exist
						'RECIPE_ID_ALREADY_EXISTS': {
							message: 'Cet Id de recette existe déjà',
							expression: (control: AbstractControl): boolean => {
								const recipeId = (control.value as string)?.toLocaleLowerCase();
								if (recipeId == null || this.recipe != null) {
									return true;
								}
								return !existingRecipeIds.has(recipeId);
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
		if (!this.canSubmit) {
			return;
		}

		this.isSaving = true;

		const request: Observable<IRecipe> = this.isCreation ?
			this.recipesService.create(this.model) :
			this.recipesService.update(this.model);

		request.subscribe(recipe => {
			this.isSaving = false;
			this.router.navigateByUrl(`${recipe.id}`);
			this.snackBar.open(`La recette ${recipe.id} a été ${this.isCreation ? 'créée' : 'modifiée'} avec succès`, 'Fermer');
		}, error => {
			this.isSaving = false;
			console.error(error);
			this.error = error;
		});
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

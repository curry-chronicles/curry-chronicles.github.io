import { IRecipePayload } from '../recipe.model';
import { ValidationResult } from './validation-result';

export function validateRecipe(recipe: IRecipePayload) {
	if (recipe == null) {
		return new ValidationResult('La recette est null')
	}

	const result = new ValidationResult();

	if (recipe.name == null || recipe.name === '') {
		result.errors.push('La recette n\'a pas de nom');
	}

	if (recipe.description == null || recipe.description === '') {
		result.errors.push('La recette n\'a pas de description');
	}

	if (recipe.publicationDate == null) {
		result.errors.push('La recette n\'a pas de date de publication');
	}

	if (recipe.mainPicture == null || recipe.mainPicture === '') {
		result.errors.push('La recette n\'a pas d\'image principale');
	}

	if (recipe.headLine == null || recipe.headLine === '') {
		result.errors.push('La recette n\'a pas d\'en-tête');
	}

	if (recipe.directions == null || recipe.directions.length === 0) {
		result.errors.push('La recette ne contient aucune étape');
	}

	if (recipe.ingredients == null || recipe.ingredients.length === 0) {
		result.errors.push('La recette ne contient aucun ingrédient');
	}

	return result;
}
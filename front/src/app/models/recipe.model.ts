import { IIngredient } from './ingredient.model';
import { IDirection } from './direction.model';

export interface IRecipeOverview {
	id: string;
	name: string;
	mainPicture: string;
	headLine: string;
	publicationDate: string;
}

export interface IRecipe extends IRecipeOverview {
	servesHowManyPeople: number;
	preparationTime: string;
	cookingTime: string;
	description: string;
	ingredients: IIngredient[];
	directions: IDirection[];
}

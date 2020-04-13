import { IIngredient } from './ingredient.model';
import { IDirection } from './direction.model';

export interface IRecipeOverview {
	id: string;
	name: string;
	mainPicture: string;
	headLine: string;
}

export interface IRecipe extends IRecipeOverview {
	publicationDate: string;
	servesHowManyPeople: number;
	preparationTime: string; // Timespan to implement ourselves
	cookingTime: string;
	description: string;
	ingredients: IIngredient[];
	directions: IDirection[];
}

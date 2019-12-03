import { IIngredient } from './ingredient.model';
import { IDirection } from './direction.model';

export interface IRecipeOverview {
	name: string;
	mainPicture: string;
	headLine: string;
}

export interface IRecipe extends IRecipeOverview {
	servesHowManyPeople: number;
	preparationTime: number; // Timespan to implement ourselves
	cookingTime: number;
	description: string;
	ingredients: IIngredient[];
	directions: IDirection[];
}

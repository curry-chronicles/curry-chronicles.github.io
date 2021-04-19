import { IIngredient } from './ingredient';
import { IDirection } from './direction';

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

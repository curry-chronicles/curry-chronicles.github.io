import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';

export interface IDirection {
	description: string;
	picture?: string;
}

export interface IIngredient {
	name: string;
	amount?: number;
	unit?: string;
}

export interface IRecipePayload {
	id: string;
	name: string;
	mainPicture: string;
	headLine: string;
	publicationDate: string;
	servesHowManyPeople: number;
	preparationTime: string;
	cookingTime: string;
	description: string;
	ingredients: IIngredient[];
	directions: IDirection[];
}

export const RecipeSchemaName = 'recipes';
export const RecipeSchema = mongoose.model(
	RecipeSchemaName,
	new Schema(
		{
			id: {
				type: String,
				unique: true
			},
			name: {
				type: String,
				default: 'DEFAULT'
			},
			mainPicture: {
				type: String,
				default: 'https://i.imgur.com/C9Fedsh.jpg'
			},
			publicationDate: {
				type: String,
				default: null
			},
			headLine: {
				type: String,
				default: ''
			},
			servesHowManyPeople: {
				type: Number,
				default: 0
			},
			preparationTime: {
				type: String,
				default: '00:00:00'
			},
			cookingTime: {
				type: String,
				default: '00:00:00'
			},
			description: {
				type: String,
				default: 'Un délicieux DEFAULT'
			},
			directions: [{
				description: {
					type: String,
					default: 'Rien'
				}
			}],
			ingredients: [{
				name: {
					type: String,
					default: 'Contemplez l\'existence.'
				},
				amount: {
					type: Number,
					default: 1
				},
				unit: String
			}]
		},
		{
			collection: RecipeSchemaName
		}
	)
);

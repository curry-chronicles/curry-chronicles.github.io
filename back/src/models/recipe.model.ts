import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';

export const RecipeSchemaName = 'recipes';

export const RecipeSchema = mongoose.model(
	RecipeSchemaName,
	new Schema(
		{
			id: String,
			name: {
				type: String,
				default: 'DEFAULT'
			},
			mainPicture: {
				type: String,
				default: 'https://i.imgur.com/C9Fedsh.jpg'
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
				name: {
					type: String,
					default: 'Rien'
				},
				amount: {
					type: Number,
					default: 1
				},
				unit: String
			}],
			ingredients: [{
				description: {
					type: String,
					default: 'Contemplez l\'existence.'
				}
			}]
		},
		{
			collection: RecipeSchemaName
		}
	)
);

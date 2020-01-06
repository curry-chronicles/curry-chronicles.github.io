import { Schema } from 'mongoose';

export const RecipeSchemaName = 'recipes';

export const RecipeSchema = new Schema(
	{
		id: String,
		name: {
			type: String,
			default: 'Un délicieux DEFAULT'
		},
		mainPicture: String,
		headLine: String
	},
	{
		collection: RecipeSchemaName
	}
);

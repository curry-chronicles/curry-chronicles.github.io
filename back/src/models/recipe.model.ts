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
				default: 'Un délicieux DEFAULT'
			},
			mainPicture: String,
			headLine: String
		},
		{
			collection: RecipeSchemaName
		}
	)
);

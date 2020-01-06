import { Request, Response } from 'express';
import { Document, model } from 'mongoose';
import { RecipeSchemaName } from '../models';

const Recipes = model(RecipeSchemaName);

export class RecipesController {
	public getAll(_: Request, response: Response): void {
		Recipes.find({}, (error: Error, recipes: Document[]) => {
			if (error != null) {
				response.send(error);
			}
			response.json(recipes);
		});
	}
}

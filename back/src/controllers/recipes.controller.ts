import { Request, Response } from 'express';
import { Document, model } from 'mongoose';
import { RecipeSchema } from '../models';

export class RecipesController {
	public getAll(_: Request, response: Response): void {
		RecipeSchema.find({}, (error: Error, recipes: Document[]) => {
			if (error != null) {
				response.send(error);
			}
			response.json(recipes);
		});
	}

	public getById(request: Request, response: Response): void {
		RecipeSchema.find({ id: request.params.recipeId }, (error: Error, recipes: Document[]) => {
			if (error != null) {
				response.send(error);
			}
			response.json(recipes);
		});
	}
}

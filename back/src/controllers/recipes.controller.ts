import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { RecipeSchema } from '../models';
import { AController } from './abstract.controller';

export class RecipesController extends AController {

	public getAll(request: Request, response: Response): void {
		RecipeSchema.find(
			this.getFilters(request),
			this.getFields(request),
			this.getPaging(request),
			(error: Error, recipes: Document[]) => {
				if (error != null) {
					response.send(error);
				}
				response.json(recipes);
			});
	}

	public getById(request: Request, response: Response): void {
		RecipeSchema.find(
			{ id: request.params.recipeId },
			this.getFields(request),
			(error: Error, recipes: Document[]) => {
				if (error != null) {
					response.send(error);
				}
				response.json(recipes[0]);
			});
	}

	public create(request: Request, response: Response): void {
		let newRecipe = new RecipeSchema(request.body);
		newRecipe.save(
			(error: Error, recipe: Document) => {
				if (error) {
					response.send(error);
				}
				response.json(recipe);
			});
	}

	public delete(request: Request, response: Response): void {
		RecipeSchema.remove(
			{ id: request.params.recipeId },
			(error: Error) => {
				if (error) {
					response.send(error);
				}
				response.json({ message: 'Recipe successfully deleted' });
			});
	}
}

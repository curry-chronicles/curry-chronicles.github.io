import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { RecipeSchema } from '../models';
import { AController } from './abstract.controller';
import { RequestResponse } from 'request';
import * as httpRequest from 'request';

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

	public getPictureById(request: Request, response: Response): void {
		httpRequest.get({
			url: 'http://sebferrer.fr/cook/recipe/img/' + request.params.recipeId + '.jpg',
			method: 'GET',
			encoding: null
		}, (error: Error, requestResponse: RequestResponse, body: Body) => {
			if (!error && requestResponse.statusCode == 200) {
				response.writeHead(200, {'Content-Type': 'image/png'});
				response.end(body);
			}
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

import { Request, Response } from 'express';
import * as imgur from 'imgur';
import { Document } from 'mongoose';
import { IRecipePayload, RecipeSchema, validateRecipe } from '../models';
import { imgurAuth } from './../imgur.json';
import { AController } from './abstract.controller';
import { LoginController } from './login.controller';

export class RecipesController extends AController {

	public getAll(request: Request, response: Response): void {
		RecipeSchema.find(
			this.getFilters(request),
			this.getFields(request),
			this.getPaging(request),
			(error: Error, recipes: Document[]) => {
				if (error != null) {
					response.send(error);
					return;
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
					return;
				}
				response.json(recipes[0]);
			});
	}

	public create(request: Request, response: Response): void {
		let loginController = new LoginController();
		if (!loginController.isLogged(request)) {
			response.status(403);
			response.send('Vous devez être identifié en tant qu\'admin');
			return;
		}

		let recipe = request.body as IRecipePayload;
		const validationResult = validateRecipe(recipe);
		if (!validationResult.isValid) {
			response.status(500);
			response.send(validationResult.toString());
			return;
		}

		recipe = this.prepare(recipe);

		imgur.setAPIUrl('https://api.imgur.com/3/');
		imgur.setCredentials(imgurAuth.login, imgurAuth.password, imgurAuth.clientId);
		imgur.uploadBase64(recipe.mainPicture, null, request.body.name, request.body.description)
			.then(json => {
				request.body.mainPicture = json.data.link;
				const newRecipeSchema = new RecipeSchema(request.body);
				newRecipeSchema.save((error: Error, recipe: Document) => {
					if (error) {
						response.status(500);
						response.send(error);
						return;
					}
					response.json(recipe);
				});
			})
			.catch(error => {
				response.send(error.message);
			})
	}

	public delete(request: Request, response: Response): void {
		let loginController = new LoginController();
		if (!loginController.isLogged(request)) {
			response.status(403);
			response.send('Vous devez être identifié en tant qu\'admin');
			return;
		}
		RecipeSchema.remove(
			{ id: request.params.recipeId },
			(error: Error) => {
				if (error) {
					response.send(error);
				}
				response.json({ message: 'Recipe successfully deleted' });
			});
	}

	private prepare(recipe: IRecipePayload): IRecipePayload {
		// Remove the "data:image/png;base64," at the beginning of the mainPicture string
		const base64Token = 'base64,';
		const base64Index = recipe.mainPicture.indexOf(base64Token);
		if (base64Index > -1) {
			recipe.mainPicture = recipe.mainPicture.substring(base64Index + base64Token.length);
		}
		return recipe;
	}

}

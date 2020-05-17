import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { IRecipePayload, RecipeSchema, validateRecipe } from '../models';
import { AController } from './abstract.controller';
import { LoginController } from './login.controller';
import { ImgurService } from '../services/imgur.service';

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
					response.status(500);
					response.send(error);
					return;
				}
				if (recipes == null || recipes.length === 0) {
					response.status(404);
					response.send(`Recipe with Id ${request.params.id} not found`);
					return;
				}
				response.json(recipes[0]);
			});
	}

	public create(request: Request, response: Response): void {
		const loginController = new LoginController();
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
		const imgurService = new ImgurService();
		imgurService.uploadBase64(recipe.mainPicture, null, request.body.name, request.body.description)
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
			});
	}

	public update(request: Request, response: Response): void {
		delete request.body._id;
		const pictureRegex = new RegExp('^data:image', 'i');
		const picture = request.body.mainPicture;

		if (pictureRegex.test(picture)) {
			let recipePayload = request.body as IRecipePayload;
			recipePayload = this.prepare(recipePayload);

			const imgurService = new ImgurService();
			imgurService.uploadBase64(recipePayload.mainPicture, null, request.body.name, request.body.description)
				.then(json => {
					request.body.mainPicture = json.data.link;
					RecipeSchema.findOneAndUpdate(
						{ id: request.params.recipeId },
						request.body,
						{ new: true },
						(error: Error, recipe: Document) => {
							if (error != null) {
								response.status(500);
								response.send(error);
								return;
							}
							if (recipe == null) {
								response.status(404);
								response.send(`Recipe with Id ${request.params.id} not found`);
								return;
							}
							response.json(recipe);
						});
				})
				.catch(error => {
					response.send(error.message);
				});
		}
		else {
			RecipeSchema.findOneAndUpdate(
				{ id: request.params.recipeId },
				request.body,
				{ new: true },
				(error: Error, recipe: Document) => {
					if (error != null) {
						response.status(500);
						response.send(error);
						return;
					}
					if (recipe == null) {
						response.status(404);
						response.send(`Recipe with Id ${request.params.id} not found`);
						return;
					}
					response.json(recipe);
				});
		}
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

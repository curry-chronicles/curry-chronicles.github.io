import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { IRecipePayload, RecipeSchema, validateRecipe } from '../models';
import { ImgurService } from '../services';
import { AController } from './abstract.controller';
import { LoginController } from './login.controller';

export class RecipesController extends AController {

	public getAll(request: Request, response: Response): void {
		RecipeSchema.find(
			this.getFilters(request),
			this.getFields(request),
			this.getPaging(request, { key: "publicationDate", direction: -1 }),
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
		let loginController = new LoginController()
		if (!loginController.isLogged(request)) {
			response.status(403);
			response.send('Vous devez être identifié en tant qu\'admin');
			return;
		}

		delete request.body._id;
		const pictureRegex = new RegExp('^data:image', 'i');
		const picture = request.body.mainPicture;

		// The picture has changed: upload it to imgur before updating Db
		if (pictureRegex.test(picture)) {
			const recipePayload = this.prepare(request.body as IRecipePayload);
			new ImgurService().uploadBase64(recipePayload.mainPicture, null, request.body.name, request.body.description)
				.then(json => {
					request.body.mainPicture = json.data.link;
					this.updateRecipeInDb(request, response);
				})
				.catch(error => {
					response.send(error.message);
				});
		}
		else {
			this.updateRecipeInDb(request, response);
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

	private updateRecipeInDb(request, response: Response) {
		RecipeSchema.findOneAndUpdate({ id: request.params.recipeId }, request.body, { new: true }, (error: Error, recipe: Document) => {
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

import { Request, Response } from 'express';
import * as imgur from 'imgur';
import { Document } from 'mongoose';
import * as httpRequest from 'request';
import { Response as RequestResponse } from 'request';
import { RecipeSchema } from '../models';
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

	public getPictureById(request: Request, response: Response): void {
		httpRequest.get({
			url: 'http://sebferrer.fr/curry-chronicles/recipe/img/' + request.params.pictureId + '.jpg',
			method: 'GET',
			encoding: null
		}, (error: Error, requestResponse: RequestResponse, body: Body) => {
			if (!error && requestResponse.statusCode == 200) {
				response.writeHead(200, { 'Content-Type': 'image/png' });
				response.end(body);
			}
		});
	}

	public create(request: Request, response: Response): void {
		let loginController = new LoginController();
		if (!loginController.isLogged(request)) {
			response.status(403);
			response.send('Vous devez être identifié en tant qu\'admin');
			return;
		}

		// TODO: remove the part before base64, at the beginning of the blob
		const base64Picture = request.body.mainPicture as string;

		imgur.setAPIUrl('https://api.imgur.com/3/');
		imgur.setCredentials(imgurAuth.login, imgurAuth.password, imgurAuth.clientId);
		imgur.uploadBase64(base64Picture, null, request.body.name, request.body.description)
			.then(json => {
				request.body.mainPicture = json.data.link;
				const newRecipeSchema = new RecipeSchema(request.body);
				newRecipeSchema.save(
					(error: Error, recipe: Document) => {
						if (error) {
							response.send(error);
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

}

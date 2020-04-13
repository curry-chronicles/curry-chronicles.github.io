import { Express } from 'express';
import { RecipesController } from '../controllers';

export function recipesRoute(app: Express): void {
	const controller = new RecipesController();

	app.route('/api/recipes')
		.get((request, result) => {
			controller.getAll(request, result);
		})
		.post((request, result) => {
			controller.create(request, result);
		});

	app.route('/api/recipes/:recipeId')
		.get((request, result) => {
			controller.getById(request, result);
		})
		.delete((request, result) => {
			controller.delete(request, result);
		});
		
	app.route('/api/pictures/:recipeId')
		.get((request, result) => {
			controller.getPictureById(request, result);
		});
}

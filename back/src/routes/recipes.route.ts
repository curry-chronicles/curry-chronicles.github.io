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
		.put((request, result) => {
			controller.update(request, result);
		})
		.delete((request, result) => {
			controller.delete(request, result);
		});
}

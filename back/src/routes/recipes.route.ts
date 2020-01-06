import { Express } from 'express';
import { RecipesController } from '../controllers';

export function recipesRoute(app: Express): void {
	const controller = new RecipesController();

	app.route('/api/recipes')
		.get(controller.getAll);
}

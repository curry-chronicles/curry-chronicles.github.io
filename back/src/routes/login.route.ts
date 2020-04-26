import { Express } from 'express';
import { LoginController } from '../controllers';

export function loginRoute(app: Express): void {
	const controller = new LoginController();

	app.route('/api/login')
		.post((request, result) => controller.login(request, result));

	app.route('/api/login-info')
		.get((request, result) => controller.loginInfo(request, result));

}

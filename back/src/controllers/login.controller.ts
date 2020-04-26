import { Request, Response } from 'express';
import { ILoginRequest } from '../models';
import { auth } from '../auth.json';
import { environment } from '../environments/environment';

const COOKIE_NAME = 'accessToken';
const COOKIE_DAYS_DURATION = 14;

export class LoginController {

	public login(request: Request, response: Response): void {
		const body = request.body as ILoginRequest;

		if (body.login !== auth.login || body.password !== auth.password) {
			response.status(401);
			response.send('Identifiants invalides');
			return;
		}

		const expiration = new Date();
		expiration.setDate(expiration.getDate() + COOKIE_DAYS_DURATION);

		response.clearCookie(COOKIE_NAME);
		response.cookie(COOKIE_NAME, auth.accessToken, {
			httpOnly: true,
			secure: environment.production,
			expires: expiration
		});

		response.json();
	}
}

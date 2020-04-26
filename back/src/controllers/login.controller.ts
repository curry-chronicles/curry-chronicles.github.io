import { Request, Response } from 'express';
import { ILoginRequest, ILoginInfo } from '../models';
import { auth } from '../auth.json';
import { environment } from '../environments/environment';

const ACCESS_TOKEN_COOKIE_NAME = 'accessToken';
const ACCES_TOKEN_COOKIE_DURATION_IN_DAYS = 14;

export class LoginController {

	public login(request: Request, response: Response): void {
		const body = request.body as ILoginRequest;

		if (body.login !== auth.login || body.password !== auth.password) {
			response.status(401);
			response.send('Identifiants invalides');
			return;
		}

		const expiration = new Date();
		expiration.setDate(expiration.getDate() + ACCES_TOKEN_COOKIE_DURATION_IN_DAYS);

		response.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
		response.cookie(ACCESS_TOKEN_COOKIE_NAME, auth.accessToken, {
			httpOnly: true,
			secure: environment.production,
			expires: expiration
		});

		response.json();
	}

	public loginInfo(request: Request, response: Response): void {
		const accessTokenCookieValue = (request?.cookies || {})[ACCESS_TOKEN_COOKIE_NAME];
		console.log(accessTokenCookieValue);
		if (accessTokenCookieValue == null || accessTokenCookieValue !== auth.accessToken) {
			response.send({ isLoggedIn: false } as ILoginInfo);
			return;
		}
		response.send({ isLoggedIn: true } as ILoginInfo);
	}
}

import { Request, Response } from 'express';
import { ILoginRequest } from '../models';
import { auth } from '../auth.json';

const COOKIE_NAME = "accessToken";
const COOKIE_DAYS_DURATION = 14;

export class LoginController {

    public login(request: Request, response: Response): void {
        const body = request.body as ILoginRequest;

        if (body.login !== auth.login || body.password !== auth.password) {
            response.send(401);
            return;
        }

        const expiration = new Date();
        expiration.setDate(expiration.getDate() + COOKIE_DAYS_DURATION);

        response.cookie(COOKIE_NAME, auth.accessToken, { httpOnly: true, expires: expiration, domain: request.get('host') });

        response.json(body);
    }
}

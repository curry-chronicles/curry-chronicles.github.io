import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ILogin, ILoginInfo } from '../models';

const LOGIN_URL = '/api/login';
const LOGOUT_URL = '/api/logout';
const LOGIN_INFO_URL = '/api/login-info';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	constructor(private http: HttpClient) { }

	public login(credentials: ILogin): Observable<any> {
		return this.http.post(`${environment.backendUrl}${LOGIN_URL}`, credentials, { withCredentials: true }).pipe(
			catchError(e => throwError(e?.error ?? 'Echec d\'authentification'))
		);
	}

	public logout(): Observable<any> {
		return this.http.post(`${environment.backendUrl}${LOGOUT_URL}`, {}, { withCredentials: true });
	}

	public isLoggedIn(): Observable<boolean> {
		return this.http.get<ILoginInfo>(`${environment.backendUrl}${LOGIN_INFO_URL}`, { withCredentials: true }).pipe(
			map(loginInfo => loginInfo?.isLoggedIn ?? false),
			catchError(() => of(false))
		);
	}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ILogin } from '../models';
import { environment } from '../../environments/environment';

const LOGIN_URL = '/api/login';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	constructor(private http: HttpClient) { }

	public login(credentials: ILogin): Observable<any> {
		return this.http.post(`${environment.backendUrl}${LOGIN_URL}`, credentials, { withCredentials: true }).pipe(
			catchError(e => throwError(e?.error ?? 'Echec d²\'authentification'))
		);
	}

	public isLoggedIn(): Observable<boolean> {
		return of(true);
	}
}

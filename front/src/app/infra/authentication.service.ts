import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ILogin } from '../models';

const LOGIN_URL = '/api/login';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	constructor(private http: HttpClient) {
	}

	public login(credentials: ILogin): Observable<any> {
		return this.http.post(LOGIN_URL, credentials, { withCredentials: true }).pipe(
			tap(e => {
				console.log(e);
			})
		);
	}

	public isLoggedIn(): Observable<boolean> {
		return of(true);
	}
}

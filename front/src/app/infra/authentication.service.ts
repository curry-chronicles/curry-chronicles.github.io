import { Injectable } from '@angular/core';
import { ILogin } from '../models';
import { Observable, throwError, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	public login(credentials: ILogin): Observable<any> {
		return throwError('Erreur 400 du cul : tu peux pas test');
	}

	public isLoggedIn(): Observable<boolean> {
		return of(true);
	}
}

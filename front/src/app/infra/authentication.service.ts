import { Injectable } from '@angular/core';
import { ILogin } from '../models';
import { Observable, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {


	public login(credentials: ILogin): Observable<any> {
		return throwError('lol nope');
	}
}

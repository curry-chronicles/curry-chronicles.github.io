import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthenticationService } from '../../services';

export interface IAuthGuardData {
	redirectOnSuccess: boolean;
	successRedirection?: string;

	redirectOnFailure: boolean;
	failureRedirection?: string;
}

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(
		private readonly router: Router,
		private readonly authenticationService: AuthenticationService
	) { }

	public canActivate(route: ActivatedRouteSnapshot, __: RouterStateSnapshot): Observable<boolean> {
		const data = route.data as IAuthGuardData;
		return this.authenticationService.isLoggedIn().pipe(
			tap(isLoggedIn => {
				if (!isLoggedIn && data?.redirectOnFailure) {
					this.router.navigateByUrl(data?.failureRedirection ?? '/');
				}
				if (isLoggedIn && data?.redirectOnSuccess && data?.successRedirection != null) {
					this.router.navigateByUrl(data.successRedirection);
				}
			}),
			map(isLoggedIn => isLoggedIn || !data.redirectOnFailure)
		);
	}
}

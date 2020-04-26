import { Component } from '@angular/core';
import { AuthenticationService } from '../../infra';
import { Router } from '@angular/router';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

	public isLoggingOut = false;

	constructor(
		private authenticationService: AuthenticationService,
		private router: Router
	) { }

	public logout(): void {
		this.isLoggingOut = true;
		this.authenticationService.logout().subscribe(() => {
			this.isLoggingOut = false;
			this.router.navigateByUrl('/');
		});
	}
}

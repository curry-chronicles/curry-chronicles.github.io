import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AuthenticationService } from '@curry-chronicles/infra';
import { ILogin } from '@curry-chronicles/models';
import { nameof } from '../../utils';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	public form: FormGroup;
	public model: ILogin;
	public fields: FormlyFieldConfig[];

	public isSaving = false;
	public error: string;

	public get canSubmit(): boolean {
		return this.form.valid && this.form.touched;
	}

	constructor(
		private authenticationService: AuthenticationService,
		private router: Router
	) {
		this.form = new FormGroup({});
		this.model = {} as ILogin;
		this.fields = [
			{
				key: nameof<ILogin>('login'),
				type: 'input',
				templateOptions: {
					label: 'Login',
					placeholder: 'Entrez votre identifiant',
					required: true
				}
			},
			{
				key: nameof<ILogin>('password'),
				type: 'input',
				templateOptions: {
					type: 'password',
					label: 'Mot de passe',
					placeholder: 'Entrez votre mot de passe',
					required: true
				}
			}
		];
	}

	public submit(): void {
		this.authenticationService.login(this.model)
			.subscribe(() => {
				this.isSaving = false;
				this.router.navigateByUrl('/admin');
			}, (error: string) => {
				this.isSaving = false;
				this.error = error;
				this.model = {
					login: this.model.login,
					password: null
				};
			});
	}
}

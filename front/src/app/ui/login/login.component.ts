import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ILogin } from '../../models';
import { nameof } from '../../utils';
import { AuthenticationService } from '../../infra';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	public form: FormGroup;
	public model: ILogin;
	public fields: FormlyFieldConfig[];

	public error: string;

	public get canSubmit(): boolean {
		return this.form.valid && this.form.touched;
	}

	constructor(
		private authenticationService: AuthenticationService
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
			.subscribe(stuff => {
				// ???
			}, (error: string) => {
				this.error = error;
			});
	}
}

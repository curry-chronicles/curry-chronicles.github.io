import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, IAuthGuardData, SharedModule } from '@curry-chronicles/shared';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { LoginComponent } from './login.component';
import { CURRY_CHRONICLES_FORMLY_CONFIG } from '../recipe-edition/forms';

const routes: Routes = [
	{
		path: '',
		component: LoginComponent,
		canActivate: [AuthGuard],
		data: {
			redirectOnSuccess: true,
			successRedirection: 'admin',
			redirectOnFailure: false
		} as IAuthGuardData
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CommonModule,
		SharedModule,
		MatCardModule,
		MatButtonModule,
		FormsModule,
		FormlyModule.forRoot(CURRY_CHRONICLES_FORMLY_CONFIG),
		FormlyMaterialModule,
		ReactiveFormsModule
	],
	declarations: [
		LoginComponent
	]
})
export class LoginModule { }

import { MatSnackBarConfig } from '@angular/material/snack-bar';

const MAGIC_SNACKBAR_DURATION_IN_MS = 2000;

export class SnackbarConfigs {

	private static _success: MatSnackBarConfig;
	public static get success(): MatSnackBarConfig {
		if (this._success != null) {
			return this._success;
		}
		this._success = new MatSnackBarConfig();
		this._success.verticalPosition = 'top';
		this._success.horizontalPosition = 'right';
		this._success.duration = MAGIC_SNACKBAR_DURATION_IN_MS;
		this._success.panelClass = 'success-snackbar';
		return this._success;
	}

	private static _error: MatSnackBarConfig;
	public static get error(): MatSnackBarConfig {
		if (this._error != null) {
			return this._error;
		}
		this._error = new MatSnackBarConfig();
		this._error.verticalPosition = 'top';
		this._error.horizontalPosition = 'right';
		this._error.duration = MAGIC_SNACKBAR_DURATION_IN_MS;
		this._error.panelClass = 'error-snackbar';
		return this._error;
	}
}

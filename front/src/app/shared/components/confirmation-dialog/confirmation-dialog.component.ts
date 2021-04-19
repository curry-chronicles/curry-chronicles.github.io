import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IConfirmationDialogData {
	title: string;
	message: string;
	confirmButtonLabel?: string;
	cancelButtonLabel: string;
}

export enum ConfirmationDialogResult {
	confirmed,
	canceled
}

@Component({
	selector: 'app-confirmation-dialog',
	templateUrl: './confirmation-dialog.component.html',
	styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

	public ConfirmationDialogResult = ConfirmationDialogResult;

	constructor(
		public readonly dialogRef: MatDialogRef<ConfirmationDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public readonly data: IConfirmationDialogData
	) {
		if (data == null) {
			throw new Error('Parameter \'data\' must be set');
		}
		data.confirmButtonLabel = data.confirmButtonLabel ?? 'D\'accord';
		data.cancelButtonLabel = data.cancelButtonLabel ?? 'Annuler';
	}
}

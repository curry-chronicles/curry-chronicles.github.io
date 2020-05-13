import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
	recipeName: string;
}

@Component({
	selector: 'app-dialog-delete',
	templateUrl: 'dialog-delete.html'
})
export class DialogDeleteComponent {

	constructor(
		public dialogRef: MatDialogRef<DialogDeleteComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

	onNoClick(): void {
		this.dialogRef.close();
	}

}
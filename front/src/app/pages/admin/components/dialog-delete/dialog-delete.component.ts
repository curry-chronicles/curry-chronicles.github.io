import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipesService } from '@curry-chronicles/shared';

export interface IDialogData {
	recipeId: string;
}

export enum DialogDeleteResult {
	confirmed,
	canceled,
	error
}

@Component({
	selector: 'app-dialog-delete',
	templateUrl: 'dialog-delete.html'
})
export class DialogDeleteComponent {

	constructor(
		public readonly dialogRef: MatDialogRef<DialogDeleteComponent>,
		@Inject(MAT_DIALOG_DATA) public readonly data: IDialogData,
		private readonly recipesService: RecipesService
	) { }

	public onNoClick(): void {
		this.dialogRef.close(DialogDeleteResult.canceled);
	}

	public onYesClick(): void {
		this.recipesService.delete(this.data.recipeId).subscribe(
			() => {
				this.dialogRef.close(DialogDeleteResult.confirmed);
			},
			() => {
				this.dialogRef.close(DialogDeleteResult.error)
			}
		);
	}
}

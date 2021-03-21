import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipesService } from '@curry-chronicles/shared';

export interface IDialogData {
	recipeId: string;
}

@Component({
	selector: 'app-dialog-delete',
	templateUrl: 'dialog-delete.html'
})
export class DialogDeleteComponent {

	constructor(
		public dialogRef: MatDialogRef<DialogDeleteComponent>,
		@Inject(MAT_DIALOG_DATA) public data: IDialogData,
		private recipesService: RecipesService
	) { }

	public onNoClick(): void {
		this.dialogRef.close({ 'answer': 'no' });
	}

	public onYesClick(): void {
		this.recipesService.delete(this.data.recipeId).subscribe(() => {
			this.dialogRef.close({ 'answer': 'yes' });
		});
	}
}

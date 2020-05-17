import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipesService } from 'src/app/infra';
import { IRecipeOverview, Page } from 'src/app/models';

export interface DialogData {
	recipeId: string;
}

@Component({
	selector: 'app-dialog-delete',
	templateUrl: 'dialog-delete.html'
})
export class DialogDeleteComponent {

	constructor(
		public dialogRef: MatDialogRef<DialogDeleteComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private recipesService: RecipesService) { }

	onNoClick(): void {
		this.dialogRef.close({ 'answer': 'no' });
	}

	onYesClick(): void {
		this.recipesService.delete(this.data.recipeId).subscribe(() => {
			this.dialogRef.close({ 'answer': 'yes' });
		});
	}

}
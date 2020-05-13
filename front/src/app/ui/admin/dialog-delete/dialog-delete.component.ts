import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipesService } from 'src/app/infra';
import { IRecipeOverview, Page } from 'src/app/models';

export interface DialogData {
	recipe: IRecipeOverview;
	recipesPage: Page<IRecipeOverview>;
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
		this.dialogRef.close();
	}

	onYesClick(): void {
		this.recipesService.delete(this.data.recipe.id).subscribe(() => {
			this.data.recipesPage.items = this.data.recipesPage.items.filter(recipe => recipe.id !== this.data.recipe.id);
		});
		this.dialogRef.close();
	}

}

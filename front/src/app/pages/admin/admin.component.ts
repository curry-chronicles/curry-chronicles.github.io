import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, IRecipeOverview, Page, RecipesService } from '@curry-chronicles/shared';
import { DialogDeleteComponent, DialogDeleteResult } from './components';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

	public isLoggingOut = false;
	public recipesPage: Page<IRecipeOverview>;
	public isLoadingMore = false;

	constructor(
		private readonly authenticationService: AuthenticationService,
		private readonly router: Router,
		private readonly recipesService: RecipesService,
		private readonly activatedRoute: ActivatedRoute,
		private readonly dialog: MatDialog,
		private readonly snackBar: MatSnackBar
	) {
		this.recipesPage = this.activatedRoute.snapshot.data.recipesPage as Page<IRecipeOverview>;
	}

	public logout(): void {
		this.isLoggingOut = true;
		this.authenticationService.logout().subscribe(() => {
			this.isLoggingOut = false;
			this.router.navigateByUrl('/');
		});
	}

	public loadMore(page: Page<IRecipeOverview>): void {
		if (page.hasReachedLimit) {
			return;
		}
		this.isLoadingMore = true;
		this.recipesService.getPagedRecipes(page).subscribe(() => {
			this.isLoadingMore = false;
		});
	}

	public openDialog(recipeId: string): void {
		this.dialog.open(DialogDeleteComponent, {
			width: '20rem',
			data: {
				recipeId
			}
		}).afterClosed().subscribe((result: DialogDeleteResult) => {
			switch (result) {
				case DialogDeleteResult.confirmed:
					this.recipesPage.items = this.recipesPage.items.filter(recipe => recipe.id !== recipeId);
					this.snackBar.open(`La recette '${recipeId}' a été supprimée avec succès`, 'Fermer');
					break;
				case DialogDeleteResult.error:
					this.snackBar.open(
						'Une erreur est survenue lors de la suppression de la recette',
						'Fermer'
					);
					break;
			}
		});
	}
}

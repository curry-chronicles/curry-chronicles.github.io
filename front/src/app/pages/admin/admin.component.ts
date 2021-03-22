import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, ConfirmationDialogComponent, ConfirmationDialogResult, IConfirmationDialogData, IRecipe, IRecipeOverview, Page, RecipesService, SnackbarConfigs } from '@curry-chronicles/shared';
import { filter, mergeMap } from 'rxjs/operators';

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

	public openDialog(recipe: IRecipe): void {
		this.dialog.open(ConfirmationDialogComponent, {
			data: {
				title: 'Supprimer la recette ?',
				message: `Voulez-vous vraiment supprimer la recette "${recipe.name}" ?`
			} as IConfirmationDialogData
		}).afterClosed().pipe(
			filter((result: ConfirmationDialogResult) => result === ConfirmationDialogResult.confirmed),
			mergeMap(() => this.recipesService.delete(recipe.id))
		).subscribe(
			() => {
				this.recipesPage.items = this.recipesPage.items.filter(r => r.id !== recipe.id);
				this.snackBar.open(
					`La recette '${recipe}' a été supprimée avec succès`,
					'Fermer',
					SnackbarConfigs.success
				);
			},
			() => {
				this.snackBar.open(
					'Une erreur est survenue lors de la suppression 😔',
					'Fermer',
					SnackbarConfigs.error
				);
			}
		);
	}
}

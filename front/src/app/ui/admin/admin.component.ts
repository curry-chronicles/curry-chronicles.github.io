import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService, RecipesService } from '../../infra';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Page, IRecipeOverview } from 'src/app/models';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

	public isLoggingOut = false;
	public recipesPage$: Observable<Page<IRecipeOverview>>;
	public isLoadingMore = false;

	constructor(
		private authenticationService: AuthenticationService,
		private router: Router,
		private recipesService: RecipesService,
		private activatedRoute: ActivatedRoute,
		private dialog: MatDialog
	) {
		this.recipesPage$ = of(this.activatedRoute.snapshot.data.recipesPage as Page<IRecipeOverview>);
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

	openDialog(recipeName: string): void {
		const dialogRef = this.dialog.open(DialogDeleteComponent, {
			width: '20rem',
			data: { 'recipeName': recipeName }
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log(result);
		});
	}
}

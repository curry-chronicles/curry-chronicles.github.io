import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { RecipesService } from '../../infra';
import { IRecipeOverview, Page } from '../../models';

const SEARCH_DEBOUNCE_TIME_IN_MS = 300;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public recipesPage$: Observable<Page<IRecipeOverview>>;

	@ViewChild('searchInputElement', { static: true })
	public searchInputElement: ElementRef<HTMLInputElement>;
	public searchInput = '';

	public isLoadingMore = false;

	public get isSearchInputEmpty(): boolean {
		return this.searchInput == null || this.searchInput.length === 0;
	}

	constructor(
		private recipesService: RecipesService
	) { }

	public ngOnInit(): void {
		this.recipesPage$ = this.recipesService.getPagedRecipes();
		fromEvent(this.searchInputElement.nativeElement, 'keyup').pipe(
			debounceTime(SEARCH_DEBOUNCE_TIME_IN_MS)
		).subscribe(() => {
			this.onSearchChanged();
		});
	}

	public onClearSearchInput(): void {
		this.searchInput = '';
		this.onSearchChanged();
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

	private onSearchChanged(): void {
		if (this.isSearchInputEmpty) {
			this.recipesPage$ = this.recipesService.getPagedRecipes();
			return;
		}
		this.recipesPage$ = this.recipesService.getRecipesByClue(this.searchInput).pipe(
			map(recipes => new Page<IRecipeOverview>(0, 0, recipes, true))
		);
	}
}

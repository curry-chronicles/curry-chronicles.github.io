import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRecipeOverview, Page, RecipesService } from '@curry-chronicles/shared';
import { fromEvent, BehaviorSubject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

const SEARCH_DEBOUNCE_TIME_IN_MS = 300;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	private recipesPage: Page<IRecipeOverview>;
	public recipesPage$: BehaviorSubject<Page<IRecipeOverview>>;

	@ViewChild('searchInputElement', { static: true })
	public searchInputElement: ElementRef<HTMLInputElement>;
	public searchInput = '';

	public isLoadingMore = false;

	public get isSearchInputEmpty(): boolean {
		return this.searchInput == null || this.searchInput.length === 0;
	}

	constructor(
		private readonly recipesService: RecipesService,
		private readonly activatedRoute: ActivatedRoute
	) {
		this.recipesPage = this.activatedRoute.snapshot.data.recipesPage as Page<IRecipeOverview>;
		this.recipesPage$ = new BehaviorSubject<Page<IRecipeOverview>>(new Page<IRecipeOverview>(0, 0, []));
		this.recipesPage$.next(this.recipesPage);
	}

	public ngOnInit(): void {
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
			this.recipesService.getPagedRecipes().subscribe(
				recipes => {
					this.recipesPage = recipes;
					this.recipesPage$.next(this.recipesPage);
				}
			);
			return;
		}
		this.recipesService.getRecipesByClue(this.searchInput).pipe(
			map(recipes => new Page<IRecipeOverview>(0, 0, recipes, true))
		).subscribe(
			recipes => {
				this.recipesPage = recipes;
					this.recipesPage$.next(this.recipesPage);
			}
		);
	}
}

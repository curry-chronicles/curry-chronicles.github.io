import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { RecipesService } from '../../infra';
import { IRecipeOverview } from '../../models';

const SEARCH_DEBOUNCE_TIME_IN_MS = 300;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public overviews$: Observable<IRecipeOverview[]>;

	@ViewChild('searchInputElement', { static: true })
	public searchInputElement: ElementRef<HTMLInputElement>;
	public searchInput = '';

	public get isSearchInputEmpty(): boolean {
		return this.searchInput == null || this.searchInput.length === 0
	}

	constructor(
		private recipesService: RecipesService
	) { }

	public ngOnInit(): void {
		this.overviews$ = this.recipesService.getRecipesOverviews();
		fromEvent(this.searchInputElement.nativeElement, 'keyup').pipe(
			debounceTime(SEARCH_DEBOUNCE_TIME_IN_MS)
		).subscribe((event) => {
			console.log(event);
			this.onSearchChanged();
		});
	}

	public onClearSearchInput(): void {
		this.searchInput = '';
		this.onSearchChanged();
	}

	private onSearchChanged(): void {
		if (this.isSearchInputEmpty) {
			this.overviews$ = this.recipesService.getRecipesOverviews();
			return;
		}
		this.overviews$ = this.recipesService.getRecipesByClue(this.searchInput);
	}
}

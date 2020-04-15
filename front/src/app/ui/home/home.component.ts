import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RecipesService } from '../../infra';
import { IRecipeOverview } from '../../models';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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

	constructor(
		private recipesService: RecipesService
	) { }

	public ngOnInit(): void {
		this.overviews$ = this.recipesService.getRecipesOverviews();
		fromEvent(this.searchInputElement.nativeElement, 'keyup').pipe(
			debounceTime(SEARCH_DEBOUNCE_TIME_IN_MS)
		).subscribe(() => {
			if (this.searchInput == null || this.searchInput.length === 0) {
				this.overviews$ = this.recipesService.getRecipesOverviews();
				return;
			}
			this.overviews$ = this.recipesService.getRecipesByClue(this.searchInput);
		});
	}
}

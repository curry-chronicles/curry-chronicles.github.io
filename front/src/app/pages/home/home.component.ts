import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Page, IRecipeOverview } from '../../shared/models';
import { RecipesService } from '../../shared/services/recipes.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchInput = '';
  recipesPage$!: Observable<Page<IRecipeOverview>>;
  private pageSubject = new BehaviorSubject<Page<IRecipeOverview> | null>(null);
  isLoadingMore = false;

  constructor(
    private readonly recipesService: RecipesService,
  ) {}

  get isSearchInputEmpty(): boolean {
    return !this.searchInput.trim();
  }

  ngOnInit(): void {
    this.recipesService.resetPaging();
    this.recipesPage$ = this.pageSubject.asObservable().pipe(map(p => p!));
    this.loadMore();
  }

  onClearSearchInput(): void {
    this.searchInput = '';
    this.onSearchChanged();
  }

  onSearchChanged(): void {
    this.recipesService.filterRecipes(this.searchInput);
    this.pageSubject.next(null);
    this.loadMore();
  }

  loadMore(_: any = null): void {
    if (this.isLoadingMore) return;
    this.isLoadingMore = true;

    this.recipesService.getPagedRecipes().subscribe(page => {
      this.pageSubject.next(page);
      this.isLoadingMore = false;
    });
  }
}

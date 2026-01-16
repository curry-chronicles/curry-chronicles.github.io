import { Component, OnInit } from '@angular/core';
import { Page, IRecipeOverview } from '../../shared/models';
import { RecipesService } from '../../shared/services/recipes.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  recipesPage: Page<IRecipeOverview> | null = null;
  isLoadingMore = false;
  isLoggingOut = false;

  constructor(
    private readonly recipesService: RecipesService,
  ) {}

  ngOnInit(): void {
    this.recipesService.resetPaging();
    this.loadMore();
  }

  loadMore(_: any = null): void {
    if (this.isLoadingMore || (this.recipesPage && this.recipesPage.hasReachedLimit)) {
      return;
    }

    this.isLoadingMore = true;

    this.recipesService.getPagedRecipes().subscribe(page => {
      this.recipesPage = page;
      this.isLoadingMore = false;
    });
  }

  logout(): void {
    this.isLoggingOut = true;
    setTimeout(() => this.isLoggingOut = false, 400);
  }

  openDialog(_: any): void {}
}

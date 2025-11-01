import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, shareReplay, catchError } from 'rxjs/operators';
import { IRecipe, IRecipeOverview, Page, ThumbnailType } from './../models';
import { ImgurService } from './imgur.service';

const RECIPES_ASSET_URL = 'assets/recipes.json';
const PAGING_INCREMENT = 10;

@Injectable()
export class RecipesService {

  private static allRecipesCache: IRecipe[] | null = null;
  private allRecipes$?: Observable<IRecipe[]>;
  private pagingState: Page<IRecipeOverview> | null = null;
  private filteredOverviews: IRecipeOverview[] | null = null;

  constructor(
    private readonly http: HttpClient,
    private readonly imgurService: ImgurService,
  ) {}

  private loadAll(): Observable<IRecipe[]> {
    if (RecipesService.allRecipesCache) {
      return of(RecipesService.allRecipesCache);
    }
    if (!this.allRecipes$) {
      this.allRecipes$ = this.http.get<any[]>(RECIPES_ASSET_URL).pipe(
        map(list =>
          list.map(r => ({
            id: r.id,
            name: r.name,
            headLine: r.headLine,
            mainPicture: r.mainPicture,
            publicationDate: r.publicationDate,
            servesHowManyPeople: r.servesHowManyPeople,
            preparationTime: r.preparationTime,
            cookingTime: r.cookingTime,
            description: r.description,
            ingredients: r.ingredients.map(i => ({
              name: i.name,
              amount: i.amount,
              unit: i.unit || '',
              quantity: i.unit ? `${i.amount} ${i.unit}` : `${i.amount}`
            })),
            directions: r.directions.map((d, index) => ({
              stepNumber: index + 1,
              description: d.description
            }))
          }))
        ),
        map(list =>
          [...list].sort(
            (a, b) =>
              new Date(b.publicationDate).getTime() -
              new Date(a.publicationDate).getTime()
          )
        ),
        shareReplay(1)
      );
    }
    return this.allRecipes$.pipe(
      map(list => {
        RecipesService.allRecipesCache = list;
        return list;
      })
    );
  }

  public getRecipesOverviews(): Observable<IRecipeOverview[]> {
    return this.loadAll().pipe(
      map(list =>
        list.map(r => ({
          id: r.id,
          name: r.name,
          headLine: r.headLine,
          publicationDate: r.publicationDate,
          mainPicture: this.imgurService.toThumbnail(
            r.mainPicture,
            ThumbnailType.largeThumbnail
          )
        }))
      )
    );
  }

  public resetPaging(): void {
    this.pagingState = null;
  }

  public filterRecipes(clue: string): void {
    const q = (clue ?? '').trim().toLowerCase();
    if (!q) {
      this.filteredOverviews = null;
      this.resetPaging();
      return;
    }
    this.getRecipesOverviews().subscribe(all => {
      this.filteredOverviews = all.filter(r =>
        (r.name ?? '').toLowerCase().includes(q) ||
        (r.headLine ?? '').toLowerCase().includes(q)
      );
      this.resetPaging();
    });
  }

  public getPagedRecipes(): Observable<Page<IRecipeOverview>> {
    const source$ = this.filteredOverviews ? of(this.filteredOverviews) : this.getRecipesOverviews();
    return source$.pipe(
      map(overviews => {
        if (!this.pagingState) {
          this.pagingState = new Page<IRecipeOverview>(0, PAGING_INCREMENT, []);
        }
        const start = this.pagingState.items.length;
        const end = start + this.pagingState.limit;
        const slice = overviews.slice(start, end);
        const newPage = new Page<IRecipeOverview>(
          this.pagingState.skip,
          this.pagingState.limit,
          [...this.pagingState.items, ...slice],
          end >= overviews.length
        );
        this.pagingState = newPage;
        return newPage;
      })
    );
  }

  public getRecipeById(id: string): Observable<IRecipe | null> {
    return this.loadAll().pipe(
      map(list => list.find(r => r.id === id) ?? null),
      catchError(() => of(null))
    );
  }

  public getAllRecipeIds(): Observable<Set<string>> {
    return this.loadAll().pipe(
      map(list => new Set<string>(list.map(r => (r.id ?? '').toLowerCase())))
    );
  }

  public create(_: IRecipe): Observable<IRecipe> {
    return throwError(() => new Error('What are you trying to do?'));
  }

  public update(_: IRecipe): Observable<IRecipe> {
    return throwError(() => new Error('What are you trying to do?'));
  }

  public delete(_: string): Observable<any> {
    return throwError(() => new Error('What are you trying to do?'));
  }
}

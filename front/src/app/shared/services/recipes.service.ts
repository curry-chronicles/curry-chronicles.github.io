import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
// TODO: inject env instead of simply importing it, see: 
// https://seangwright.medium.com/the-best-way-to-use-angulars-environment-files-a0c098551abc
import { environment } from './../../../environments/environment';
import { IRecipe, IRecipeOverview, Page, ThumbnailType } from './../models';
import { ImgurService } from './imgur.service';

const RECIPES_API = '/api/recipes';
const RECIPE_OVERVIEW_FIELDS = 'id,name,mainPicture,headLine,publicationDate';

const PAGING_INCREMENT = 10;

@Injectable()
export class RecipesService {
	private static recipes: Observable<IRecipeOverview[]>;

	constructor(
		private readonly http: HttpClient,
		private readonly imgurService: ImgurService
	) { }

	public getPagedRecipes(currentPaging: Page<IRecipeOverview> = null): Observable<Page<IRecipeOverview>> {
		if (currentPaging == null) {
			currentPaging = new Page<IRecipeOverview>(0, PAGING_INCREMENT, []);
		} else {
			currentPaging.skip += PAGING_INCREMENT;
		}
		return this.http.get<IRecipeOverview[]>(
			`${environment.backendUrl}${RECIPES_API}?fields=${RECIPE_OVERVIEW_FIELDS}&paging=${currentPaging.skip},${currentPaging.limit}`
		).pipe(
			map(recipes => {
				if (recipes.length === 0) {
					currentPaging.hasReachedLimit = true;
				}
				recipes.forEach(recipe => {
					recipe.mainPicture = this.imgurService.toThumbnail(recipe.mainPicture, ThumbnailType.largeThumbnail);
				});
				currentPaging.items.push(...recipes);
				return currentPaging;
			})
		).pipe(
			catchError(error => {
				console.error(error);
				return of(new Page<IRecipeOverview>(0, PAGING_INCREMENT, []))
			})
		);
	}

	public getRecipesOverviews(): Observable<IRecipeOverview[]> {
		if (RecipesService.recipes == null) {
			RecipesService.recipes = this.http.get<IRecipeOverview[]>(
				`${environment.backendUrl}${RECIPES_API}?fields=${RECIPE_OVERVIEW_FIELDS}`
			).pipe(
				shareReplay(1)
			);
		}
		return RecipesService.recipes;
	}

	public getRecipesByClue(clue: string): Observable<IRecipeOverview[]> {
		return this.http.get<IRecipeOverview[]>(
			`${environment.backendUrl}${RECIPES_API}?fields=${RECIPE_OVERVIEW_FIELDS}&name=like,${clue}`
		).pipe(
			map(recipes => {
				recipes.forEach(recipe => {
					recipe.mainPicture = this.imgurService.toThumbnail(recipe.mainPicture, ThumbnailType.largeThumbnail);
				});
				return recipes;
			})
		);
	}

	public getRecipeById(id: string): Observable<IRecipe> {
		return this.http.get<IRecipe>(`${environment.backendUrl}${RECIPES_API}/${id}`).pipe(
			catchError(_ => of(null))
		);
	}

	/** Returns the lowercased Ids of all existing recipes */
	public getAllRecipeIds(): Observable<Set<string>> {
		return this.http.get<IRecipeOverview[]>(`${environment.backendUrl}${RECIPES_API}?fields=id`).pipe(
			map(recipes => new Set<string>(recipes.map(recipe => recipe.id.toLocaleLowerCase())))
		);
	}

	public create(recipe: IRecipe): Observable<IRecipe> {
		return this.http.post<IRecipe>(`${environment.backendUrl}${RECIPES_API}`, recipe, { withCredentials: true });
	}

	public update(recipe: IRecipe): Observable<IRecipe> {
		return this.http.put<IRecipe>(`${environment.backendUrl}${RECIPES_API}/${recipe.id}`, recipe, { withCredentials: true });
	}

	public delete(id: string): Observable<any> {
		return this.http.delete(`${environment.backendUrl}${RECIPES_API}/${id}`, { withCredentials: true });
	}
}

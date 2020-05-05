import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IRecipe, IRecipeOverview, Page, ThumbnailType } from '../models';
import { todayAsIsoString } from '../utils';
import { ImgurService } from './imgur.service';

const RECIPES_API = '/api/recipes';

const DEFAULT_RECIPE: IRecipe = {
	id: 'default',
	name: 'Default',
	publicationDate: todayAsIsoString(),
	mainPicture: '',
	headLine: '',
	servesHowManyPeople: 0,
	preparationTime: '00:00:00',
	cookingTime: '00:00:00',
	description: 'Un délicieux DEFAULT',
	ingredients: [
		{ name: 'Rien', amount: 1 }
	],
	directions: [
		{ description: 'Contemplez l\'existence.' }
	]
};

const RECIPE_OVERVIEW_FIELDS = 'id,name,mainPicture,headLine';

const PAGING_INCREMENT = 10;

@Injectable()
export class RecipesService {
	private static recipes: Observable<IRecipeOverview[]>;

	constructor(
		private http: HttpClient,
		private imgurService: ImgurService
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
		);
	}

	public getRecipe(id: string): Observable<IRecipe> {
		return this.http.get<IRecipe>(`${environment.backendUrl}${RECIPES_API}/${id}`).pipe(
			catchError(_ => {
				return of(DEFAULT_RECIPE);
			}));
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
}

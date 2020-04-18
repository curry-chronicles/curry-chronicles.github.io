import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { IRecipe, IRecipeOverview, Page } from '../models';
import { todayAsIsoString } from '../utils';

const IMG_SERVER = 'https://curry-chronicles.fr/api/pictures/';
const RECIPES_API = 'https://curry-chronicles.fr/api/recipes';

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

	constructor(private http: HttpClient) { }

	public getPagedRecipes(currentPaging: Page<IRecipeOverview> = null): Observable<Page<IRecipeOverview>> {
		if (currentPaging == null) {
			currentPaging = new Page<IRecipeOverview>(0, PAGING_INCREMENT, []);
		} else {
			currentPaging.skip += PAGING_INCREMENT;
		}
		return this.http.get<IRecipeOverview[]>(
			`${RECIPES_API}?fields=${RECIPE_OVERVIEW_FIELDS}&paging=${currentPaging.skip},${currentPaging.limit}`
		).pipe(
			map(recipes => {
				if (recipes.length === 0) {
					currentPaging.hasReachedLimit = true;
				}
				recipes.forEach(recipe => {
					recipe.mainPicture = this.getMainPictureUrl(recipe);
				});
				currentPaging.items.push(...recipes);
				return currentPaging;
			})
		);
	}

	public getRecipesOverviews(): Observable<IRecipeOverview[]> {
		if (RecipesService.recipes == null) {
			RecipesService.recipes = this.http.get<IRecipeOverview[]>(
				`${RECIPES_API}?fields=${RECIPE_OVERVIEW_FIELDS}`
			).pipe(
				map(recipes => {
					recipes.forEach(recipe => {
						recipe.mainPicture = this.getMainPictureUrl(recipe);
					});
					return recipes;
				}),
				shareReplay(1)
			);
		}
		return RecipesService.recipes;
	}

	public getRecipesByClue(clue: string): Observable<IRecipeOverview[]> {
		return this.http.get<IRecipeOverview[]>(
			`${RECIPES_API}?fields=${RECIPE_OVERVIEW_FIELDS}&name=like,${clue}`
		).pipe(
			map(recipes => {
				recipes.forEach(recipe => {
					recipe.mainPicture = this.getMainPictureUrl(recipe);
				});
				return recipes;
			})
		);
	}

	public getRecipe(id: string): Observable<IRecipe> {
		return this.http.get<IRecipe>(`${RECIPES_API}/${id}`).pipe(
			map(recipe => {
				recipe.mainPicture = this.getMainPictureUrl(recipe);
				return recipe;
			}), catchError(_ => {
				return of(DEFAULT_RECIPE);
			}));
	}

	private getMainPictureUrl(recipe: IRecipeOverview) {
		return `${IMG_SERVER}${recipe.mainPicture}`;
	}
}

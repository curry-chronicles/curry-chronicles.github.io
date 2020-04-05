import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { IRecipe, IRecipeOverview } from '../models';

const IMG_SERVER = 'sebferrer.fr/curry-chronicles/recipe/img/';
const RECIPES_API = 'https://curry-chronicles.fr/api/recipes';

const DEFAULT_RECIPE: IRecipe = {
	id: 'default',
	name: 'Default',
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

@Injectable()
export class RecipesService {
	private static recipes: Observable<IRecipeOverview[]>;

	constructor(private http: HttpClient) { }

	public getRecipesOverviews(): Observable<IRecipeOverview[]> {
		if (RecipesService.recipes == null) {
			RecipesService.recipes = this.http.get<IRecipeOverview[]>(RECIPES_API).pipe(
				map(recipes => {
					recipes.forEach(recipe => {
						recipe.mainPicture = `http://${IMG_SERVER}${recipe.mainPicture}`;
					});
					return recipes;
				}),
				shareReplay(1)
			);
		}
		return RecipesService.recipes;
	}

	public getRecipe(id: string): Observable<IRecipe> {
		return this.http.get<IRecipe>(`${RECIPES_API}/${id}`).pipe(
			map(recipe => {
				recipe.mainPicture = `http://${IMG_SERVER}${recipe.mainPicture}`;
				return recipe;
			}), catchError(_ => {
				return of(DEFAULT_RECIPE);
			}));
	}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { IRecipe, IRecipeOverview } from '../models';

const IMG_SERVER = "sebferrer.fr/curry-chronicles/recipe/img/";
const RECIPES_API = "http://164.132.97.208:5002/api/recipes";

const DEFAULT_RECIPE: IRecipe = {
	id: 'default',
	name: 'Default',
	mainPicture: 'https://scontent-cdg2-1.cdninstagram.com/v/t51.2885-15/e35/69316854_509717162933918_2113320626994813678_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com&_nc_cat=102&oh=fed08636a6b4e2d543e79bc5611e2477&oe=5E8C34D4',
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
		return this.http.get<IRecipe>(`${RECIPES_API}/${id}`)
			.pipe(map(recipe => {
				recipe.mainPicture = `http://${IMG_SERVER}${recipe.mainPicture}`;
				return recipe;
			}), catchError(err => {
				return of(DEFAULT_RECIPE);
			}));
	}
}

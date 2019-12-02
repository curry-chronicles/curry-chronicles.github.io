import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { IRecipeOverview } from '../models';

/**
 * TEMP
 */
const RECIPES_OVERVIEWS: IRecipeOverview[] = [
	{
		name: 'Oignons aux oignons',
		mainPicture: 'onions-damn-inions.jpg',
		headLine: 'Damn onions'
	},
	{
		name: 'Famous bacon burger',
		mainPicture: 'bacon.jpg',
		headLine: 'BURGERS'
	}
];

@Injectable()
export class RecipesService {

	constructor(private http: HttpClient) { }

	public getRecipesOverviews(): Observable<IRecipeOverview[]> {
		return of(RECIPES_OVERVIEWS).pipe(
			delay(2000)
		);
	}
}

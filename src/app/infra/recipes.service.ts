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
		name: 'Poulet Curry',
		mainPicture: 'onions-damn-inions.jpg',
		headLine: 'C\'est du poulet avec du curry'
	},
	{
		name: 'Salade Légendaire Du Paradis',
		mainPicture: 'onions-damn-inions.jpg',
		headLine: 'Avec un nom pareil pourquoi hésiter'
	},
	{
		name: 'Broco-Poulet Quinoa',
		mainPicture: 'onions-damn-inions.jpg',
		headLine: 'It\'s so healthy'
	},
	{
		name: 'Poulet Caramel',
		mainPicture: 'onions-damn-inions.jpg',
		headLine: 'Plus jamais je fais du caramel'
	},
	{
		name: 'Pelmenis',
		mainPicture: 'onions-damn-inions.jpg',
		headLine: 'Un plat russe sans vodka'
	},
	{
		name: 'Lasagnes Bellegrave',
		mainPicture: 'onions-damn-inions.jpg',
		headLine: 'Elles coûtent cher'
	},
	{
		name: 'Soupe De Poulet',
		mainPicture: 'onions-damn-inions.jpg',
		headLine: 'Idéal quand t\'as 40 de fièvre'
	},
	{
		name: 'Poulet Aux Légumes',
		mainPicture: 'onions-damn-inions.jpg',
		headLine: 'J\'ai pas trouvé mieux comme nom'
	},
];

@Injectable()
export class RecipesService {

	constructor(private http: HttpClient) { }

	public getRecipesOverviews(): Observable<IRecipeOverview[]> {
		return of(RECIPES_OVERVIEWS).pipe(
			// delay(2000)
		);
	}
}

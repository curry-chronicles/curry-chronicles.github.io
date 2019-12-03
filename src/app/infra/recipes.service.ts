import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { IRecipeOverview, IRecipe } from '../models';

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

const RECIPE_CURRY: IRecipe = {
	name: 'Poulet Curry',
	mainPicture: 'onions-damn-inions.jpg',
	headLine: 'C\'est du poulet avec du curry',
	servesHowManyPeople: 3,
	preparationTime: 30,
	cookingTime: 45,
	description: 'Un décilieux poulet au curry qui rendra jaloux tout votre entourage',
	ingredients: [
		{ name: 'Escalope de poulet', amount: 4 },
		{ name: 'Pâte de curry', amount: 165, unit: 'g' },
		{ name: 'Lait de coco', amount: 400, unit: 'ml' },
		{ name: 'Oignon', amount: 3 },
		{ name: 'Gingembre en poudre', amount: 5, unit: 'g' },
		{ name: 'Poivron (rouge, jaune)', amount: 3 },
		{ name: 'Riz', amount: 300, unit: 'g' }
	],
	directions: [
		{ description: 'Couper les oignons puis les faire revenir à l\'eau et à la poudre de gingembre.' },
		{ description: 'Couper le poulet en bouts ni trop gros ni trop petits (en gros tu te débrouilles mais fais ça bien).' },
		{ description: 'Couper les poivrons en fines lamelles. En gros tu coupes en 8 puis tu fais des lamelles sur les morceaux.' },
		{ description: 'Mettre le poulet dans une marmite ou une cocotte à feu moyen. Ajouter immédiatement le lait de coco.' },
		{ description: 'Ajouter la pâte de curry en 3 fois (t\'ajoutes, tu mélanges).' },
		{ description: 'Ajouter les oigons, mélanger.' },
		{ description: 'Laisser une dizaine de minutes à feu moyen.' },
		{ description: 'Laisser mijoter 35 minutes à feux très doux.' },
		{ description: 'A 10 minutes de la fin, faire cuire le riz.' },
		{ description: 'Servir le riz dans une assiette puis ajouter une portion de poulet curry.' },
		{ description: 'Prends une photo et partages-là sur Instagram #pouletcurry.' }
	]
};

@Injectable()
export class RecipesService {

	constructor(private http: HttpClient) { }

	public getRecipesOverviews(): Observable<IRecipeOverview[]> {
		return of(RECIPES_OVERVIEWS).pipe(
			// delay(2000)
		);
	}
}

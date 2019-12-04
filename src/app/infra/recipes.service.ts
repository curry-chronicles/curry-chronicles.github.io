import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { IRecipe, IRecipeOverview } from '../models';

const DEFAULT_RECIPE: IRecipe = {
	id: 'default',
	name: 'Default',
	mainPicture: 'onions-damn-inions.jpg',
	headLine: '',
	servesHowManyPeople: 0,
	preparationTime: 0,
	cookingTime: 0,
	description: 'Un délicieux DEFAULT',
	ingredients: [
		{ name: 'Rien', amount: 1 }
	],
	directions: [
		{ description: 'Contemplez l\'existence.' }
	]
};

const RECIPES: IRecipe[] = [
	{
		id: 'curry',
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
	}
];

@Injectable()
export class RecipesService {

	constructor(private http: HttpClient) { }

	public getRecipesOverviews(): Observable<IRecipeOverview[]> {
		return of(RECIPES).pipe(
			// delay(2000)
		);
	}

	public getRecipe(id: string): Observable<IRecipe> {
		return of(RECIPES.find(recipe => recipe.id === id) || DEFAULT_RECIPE);
	}
}

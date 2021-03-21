import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ImgurService, IRecipe, ThumbnailType } from '@curry-chronicles/shared';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
	selector: 'app-recipe',
	templateUrl: './recipe.component.html',
	styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {

	public recipe: IRecipe;

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly imgurService: ImgurService
	) {
		//TODO: enh, retrieving data should be easier
		this.router.events.pipe(
			filter(event => event instanceof NavigationEnd),
			switchMap(() => this.route.data),
			map(data => data?.recipe as IRecipe),
			filter(recipe => recipe != null),
		).subscribe(recipe => {
			this.recipe = recipe;
			this.recipe.mainPicture = this.imgurService.toThumbnail(recipe.mainPicture, ThumbnailType.hugeThumbnail);
		});
	}
}

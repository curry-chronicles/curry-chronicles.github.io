import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { IRecipe, ThumbnailType } from '@curry-chronicles/models';
import { ImgurService } from '../../infra';

@Component({
	selector: 'app-recipe',
	templateUrl: './recipe.component.html',
	styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {

	public recipe: IRecipe;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private imgurService: ImgurService
	) {
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

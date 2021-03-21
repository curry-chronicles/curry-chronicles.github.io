import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { InfiniteScrollComponent } from './components';
import { AutofocusOnShowDirective, FileValueAccessorDirective } from './directives';
import { RecipeResolver, RecipesPageResolver } from './resolvers';
import { AuthenticationService, ImgurService, RecipesService } from './services';

@NgModule({
	providers: [
		AuthenticationService,
		ImgurService,
		RecipesService,
		RecipesPageResolver,
		RecipeResolver
	],
	declarations: [
		AutofocusOnShowDirective,
		FileValueAccessorDirective,
		InfiniteScrollComponent
	],
	exports: [
		InfiniteScrollComponent,
		AutofocusOnShowDirective
	],
	imports: [
		HttpClientModule
	]
})
export class SharedModule { }
export interface IRecipeOverview {
	name: string;
	mainPicture: string;
	headLine: string;
}

export interface IRecipe extends IRecipeOverview {
	/**
	 * TODO everything
	 */
	servesHowManyPeople: number;
}

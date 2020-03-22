export interface IIngredient {
	name: string;
	amount?: number;
	unit?: string;
}

export function isIngredientValid(value: IIngredient): boolean {
	return value != null && value.name != null && value.name.length > 0;
}

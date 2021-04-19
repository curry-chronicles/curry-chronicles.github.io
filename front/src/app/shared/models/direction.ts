export interface IDirection {
	description: string;
	picture?: string;
}

export function isDirectionValid(value: IDirection): boolean {
	return value != null && value.description != null && value.description.length > 0;
}

import { Request } from "express";

export interface IQuery {
	fields?: string;
	paging?: string;
}

export interface ISortParams {
	key: string,
	direction: number
}

export class Paging {
	constructor(
		public skip: number,
		public limit: number,
		public sort?: any
	) { }

	public static parse(rawPaging: string, sortParams?: ISortParams): Paging {
		const splitted = (rawPaging || '').split(',').map(value => parseInt(value));
		if (splitted == null || splitted.length == null) {
			return null;
		}
		const sort = sortParams == null ? {} : {[sortParams.key]: sortParams.direction};
		return new Paging(splitted[0], splitted[1], sort);
	}
}

export interface IRequest extends Request {
	query: IQuery;
}

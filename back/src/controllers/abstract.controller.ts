import { IRequest, Paging, ISortParams } from '../models';

const IGNORED_FILTERS = new Set<string>(['fields', 'paging']);

export abstract class AController {

	protected getFilters(request: IRequest): any {
		const query = request?.query || {};
		const keys = Object.keys(query);
		const result = {};
		keys.filter(key => !IGNORED_FILTERS.has(key))
			.forEach(key => {
				// Like operator?
				const likeRegex = /like,([A-Za-zÀ-ÖØ-öø-ÿœ]+)/mg.exec(query[key]);
				if (likeRegex != null) {
					result[key] = {
						$regex: likeRegex[1],
						$options: 'i'
					};
				} else {
					result[key] = query[key];
				}
			});
		return result;
	}

	// TODO: enh, correctly interpret fields between square brackets, e.g. 'ingredients[name,unit]'
	protected getFields(request: IRequest): string[] {
		return (request?.query?.fields || '').split(',');
	}

	protected getPaging(request: IRequest, sortParams?: ISortParams): Paging {
		return Paging.parse(request?.query?.paging, sortParams);
	}
}

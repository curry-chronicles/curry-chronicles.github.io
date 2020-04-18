export class Page<T> {
	public hasReachedLimit = false;
	constructor(
		public skip: number,
		public readonly limit: number,
		public items: T[]
	) { }
}

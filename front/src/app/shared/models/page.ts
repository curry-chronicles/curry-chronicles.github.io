export class Page<T> {
	constructor(
		public skip: number,
		public readonly limit: number,
		public items: T[],
		public hasReachedLimit = false
	) { }
}

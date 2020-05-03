export class ValidationResult {

	public readonly errors: string[];

	public get isValid(): boolean {
		return this.errors == null || this.errors.length === 0;
	}

	constructor(...errors: string[]) {
		this.errors = errors ?? [];
	}

	public toString(): string {
		return this.errors?.join(', ') ?? '';
	}
}

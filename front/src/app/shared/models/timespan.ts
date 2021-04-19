export class Timespan {

	public get isEmpty(): boolean {
		return this.hours == null && this.minutes == null && this.seconds == null;
	}

	public get isValid(): boolean {
		return (this.hours != null || this.minutes != null || this.seconds != null) &&
			(this.hours >= 0 && this.hours <= 23) &&
			(this.minutes >= 0 && this.minutes <= 59) &&
			(this.seconds >= 0 && this.seconds <= 59);
	}

	constructor(
		public hours: number,
		public minutes: number,
		public seconds: number
	) { }

	public toString(): string {
		if (this.isEmpty || !this.isValid) {
			return null;
		}
		return `${this.hours || '00'}:${this.minutes || '00'}:${this.seconds || '00'}`;
	}

	public static parse(input: string): Timespan {
		const regex = new RegExp(/(\d+):(\d+):(\d+)/gm);
		const parseResult = regex.exec(input);

		if (parseResult == null) {
			return new Timespan(null, null, null);
		}
		return new Timespan(
			parseInt(parseResult[1], 10),
			parseInt(parseResult[2], 10),
			parseInt(parseResult[3], 10),
		);
	}
}

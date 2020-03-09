import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

class Timespan {
	constructor(
		public hours: number,
		public minutes: number,
		public seconds: number
	) { }

	public toString(): string {
		return `${this.hours}:${this.minutes}:${this.seconds}`;
	}

	public static parse(input: string): Timespan {
		const regex = new RegExp(/(?<hours>\d+):(?<minutes>\d+):(?<seconds>\d+)/gm);
		const parseResult = regex.exec(input);
		console.log(parseResult);
		if (parseResult == null) {
			return new Timespan(0, 0, 0);
		}
		return new Timespan(
			parseInt(parseResult.groups.hours, 10),
			parseInt(parseResult.groups.minutes, 10),
			parseInt(parseResult.groups.seconds, 10),
		);
	}
}

@Component({
	selector: 'app-timespan-editor',
	templateUrl: './timespan-editor.component.html',
	styleUrls: ['./timespan-editor.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TimespanEditorComponent),
			multi: true
		}
	]
})
export class TimespanEditorComponent implements ControlValueAccessor {

	public value = new Timespan(0, 0, 0);

	public writeValue(obj: string): void {
		this.value = Timespan.parse(obj);
	}

	public registerOnChange(fn: any): void {
		// TODO
	}

	public registerOnTouched(fn: any): void {
		// TODO
	}

	public setDisabledState?(isDisabled: boolean): void {
		// TODO
	}
}

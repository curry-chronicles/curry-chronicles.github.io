import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

class Timespan {

	public get isEmpty(): boolean {
		return this.hours == null && this.minutes == null && this.seconds == null;
	}

	constructor(
		public hours: number,
		public minutes: number,
		public seconds: number
	) { }

	public toString(): string {
		return `${this.hours || '00'}:${this.minutes || '00'}:${this.seconds || '00'}`;
	}

	public static parse(input: string): Timespan {
		const regex = new RegExp(/(?<hours>\d+):(?<minutes>\d+):(?<seconds>\d+)/gm);
		const parseResult = regex.exec(input);

		if (parseResult == null) {
			return new Timespan(null, null, null);
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

	public onChangeCallback: (newValue: string) => void = () => { };
	public registerOnChange(fn: (newValue: string) => void): void {
		this.onChangeCallback = fn;
	}

	public registerOnTouched(fn: any): void {
		// TODO
	}

	public setDisabledState?(isDisabled: boolean): void {
		// TODO
	}

	public onChange(): void {
		if (this.value.isEmpty) {
			this.onChangeCallback(null);
		} else {
			this.onChangeCallback(this.value.toString());
		}
	}
}

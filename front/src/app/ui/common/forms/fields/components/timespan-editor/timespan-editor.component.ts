import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

class Timespan {

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

	public isDisabled = false;

	public onChanged: (newValue: string) => void = () => { };
	public onTouched: () => void = () => { };

	public writeValue(obj: string): void {
		this.value = Timespan.parse(obj);
	}

	public registerOnChange(fn: (newValue: string) => void): void {
		this.onChanged = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	public setDisabledState?(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}

	public onValueChanged(): void {
		this.onChanged(this.value.toString());
	}
}

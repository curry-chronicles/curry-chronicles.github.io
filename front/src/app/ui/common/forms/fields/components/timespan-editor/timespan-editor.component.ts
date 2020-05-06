import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Timespan } from '../../../../../../models';

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

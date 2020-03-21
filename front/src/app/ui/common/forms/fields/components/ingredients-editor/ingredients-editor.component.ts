import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IIngredient } from '../../../../../../models';

@Component({
	selector: 'app-ingredients-editor',
	templateUrl: './ingredients-editor.component.html',
	styleUrls: ['./ingredients-editor.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => IngredientsEditorComponent),
			multi: true
		}
	]
})
export class IngredientsEditorComponent implements ControlValueAccessor {

	public onChanged: (newValue: IIngredient[]) => void = () => { };
	public onTouched: () => void = () => { };

	public value = new Array<IIngredient>();

	public writeValue(obj: IIngredient[]): void {
		this.value = obj;
	}

	public registerOnChange(fn: (newValue: IIngredient[]) => void): void {
		this.onChanged = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public setDisabledState?(isDisabled: boolean): void {

	}

}

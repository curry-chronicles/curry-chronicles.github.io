import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { IIngredient, isIngredientValid } from '../../../../../../models';

@Component({
	selector: 'app-ingredients-editor',
	templateUrl: './ingredients-editor.component.html',
	styleUrls: ['./ingredients-editor.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => IngredientsEditorComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: IngredientsEditorComponent,
			multi: true
		}
	]
})
export class IngredientsEditorComponent implements ControlValueAccessor, Validator {

	public get canAddIngredient(): boolean {
		return this.ingredients.length === 0 || isIngredientValid(this.ingredients[this.ingredients.length - 1]);
	}

	public ingredients = new Array<IIngredient>();

	public addIngredient(ingredientIndex?: number): void {
		if (!this.canAddIngredient) {
			return;
		}
		const newIngredient = {
			name: ''
		};
		if (ingredientIndex != null) {
			this.ingredients.splice(ingredientIndex + 1, 0, newIngredient);
		} else {
			this.ingredients.push(newIngredient);
		}
	}

	public removeIngredientAt(ingredientIndex: number): void {
		if (ingredientIndex == null) {
			return;
		}
		this.ingredients.splice(ingredientIndex, 1);
	}

	public onDropIngredient(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.ingredients, event.previousIndex, event.currentIndex);
	}

	public onIngredientsChanged(): void {
		this.onChanged([...this.ingredients]);
	}

	// ControlValueAccessor

	public onChanged: (newValue: IIngredient[]) => void = () => { };
	public onTouched: () => void = () => { };
	public isDisabled = false;

	public writeValue(obj: IIngredient[]): void {
		this.ingredients = obj;
	}

	public registerOnChange(fn: (newValue: IIngredient[]) => void): void {
		this.onChanged = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public setDisabledState?(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}

	// Validator

	public validate(control: AbstractControl): ValidationErrors {
		if (control.pristine) {
			return null;
		}

		const ingredients = control.value as IIngredient[];
		if (ingredients == null) {
			return null;
		}

		if (ingredients.length === 0) {
			return { empty: true };
		}

		if (ingredients.some(ingredient => !isIngredientValid(ingredient))) {
			return { valid: false };
		}

		return null;
	}
}

import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { IDirection, isDirectionValid } from '@curry-chronicles/models';

@Component({
	selector: 'app-directions-editor',
	templateUrl: './directions-editor.component.html',
	styleUrls: ['./directions-editor.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DirectionsEditorComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: DirectionsEditorComponent,
			multi: true
		}
	]
})
export class DirectionsEditorComponent implements ControlValueAccessor, Validator {

	public get canAddDirection(): boolean {
		return this.directions.length === 0 || isDirectionValid(this.directions[this.directions.length - 1]);
	}

	public directions = new Array<IDirection>();

	public addDirection(directionIndex?: number): void {
		if (!this.canAddDirection) {
			return;
		}
		const newDirection = {
			description: ''
		};
		if (directionIndex != null) {
			this.directions.splice(directionIndex + 1, 0, newDirection);
		} else {
			this.directions.push(newDirection);
		}
	}

	public onEnter(directionIndex: number): void {
		this.directions[directionIndex].description = this.directions[directionIndex].description.substr(0, this.directions[directionIndex].description.length - 1);
		this.addDirection(directionIndex);
	}

	public removeDirectionAt(directionIndex: number): void {
		if (directionIndex == null) {
			return;
		}
		this.directions.splice(directionIndex, 1);
	}

	public onDropDirection(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.directions, event.previousIndex, event.currentIndex);
		this.onDirectionsChanged();
	}

	public onDirectionsChanged(): void {
		this.onChanged([...this.directions]);
	}

	// ControlValueAccessor

	public onChanged: (newValue: IDirection[]) => void = () => { };
	public onTouched: () => void = () => { };
	public isDisabled = false;

	public writeValue(obj: IDirection[]): void {
		this.directions = obj;
	}

	public registerOnChange(fn: (newValue: IDirection[]) => void): void {
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

		const directions = control.value as IDirection[];
		if (directions == null) {
			return null;
		}

		if (directions.length === 0) {
			return { empty: true };
		}

		if (directions.some(direction => !isDirectionValid(direction))) {
			return { valid: false };
		}

		return null;
	}
}

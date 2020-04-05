import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-picture-editor',
	templateUrl: './picture-editor.component.html',
	styleUrls: ['./picture-editor.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => PictureEditorComponent),
			multi: true
		}
	]
})
export class PictureEditorComponent implements ControlValueAccessor {

	public value: string;

	public isDisabled = false;

	public onChanged: (newValue: string) => void = () => { };
	public onTouched: () => void = () => { };

	public writeValue(obj: string): void {
		this.value = obj;
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
		this.onChanged(this.value);
	}

	public onSelectedFileChanged(selectedFileEvent: Event): void {
		const selectedFile = (selectedFileEvent.target as HTMLInputElement).files[0];
		if (selectedFile == null) {
			this.value = null;
			this.onValueChanged();
			return;
		}
		this.toBase64(selectedFile).subscribe(base64 => {
			this.value = base64;
			this.onValueChanged();
		});
	}

	private toBase64(file: File): Observable<string> {
		return new Observable(observer => {
			const reader = new FileReader();
			reader.onloadend = (event: any) => {
				const base64 = event.target.result;
				observer.next(base64);
				observer.complete();
			};
			reader.readAsDataURL(file);
		});
	}
}

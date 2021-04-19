import { Component, forwardRef, ViewChild, ElementRef } from '@angular/core';
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

	@ViewChild('fileInput')
	public fileInput: ElementRef<HTMLInputElement>;

	public base64File: string;
	public fileName: string;

	public isDisabled = false;

	public onChanged: (newValue: string) => void = () => { };
	public onTouched: () => void = () => { };

	public writeValue(obj: string): void {
		this.base64File = obj;
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
		this.onChanged(this.base64File);
	}

	public browse(): void {
		this.fileInput.nativeElement.click();
	}

	public clear(): void {
		this.base64File = null;
		this.fileName = null;
		this.onValueChanged();
	}

	public onSelectedFileChanged(selectedFileEvent: Event): void {
		const selectedFile = (selectedFileEvent?.target as HTMLInputElement)?.files?.item(0);
		if (selectedFile == null) {
			this.clear();
			return;
		}
		this.fileName = selectedFile.name;
		this.toBase64(selectedFile).subscribe(base64 => {
			this.base64File = base64;
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

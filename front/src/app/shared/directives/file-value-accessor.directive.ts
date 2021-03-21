import { Directive, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

// Taken from: https://ngx-formly.github.io/ngx-formly/examples/other/input-file

@Directive({
	// tslint:disable-next-line
	selector: 'input[type=file]',
	// tslint:disable-next-line: no-host-metadata-property
	host: {
		'(change)': 'onFilesChanged($event.target.files)',
		'(blur)': 'onTouched()'
	},
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: FileValueAccessorDirective,
		multi: true
	}]
})
export class FileValueAccessorDirective implements ControlValueAccessor {
	public value: any;
	public onChange = _ => { };
	public onTouched = () => { };

	private get isMultiple(): boolean { return (this.element.nativeElement as HTMLInputElement).multiple; }

	constructor(private element: ElementRef) { }

	public writeValue(_) {
		// Nothing to do
	}

	public registerOnChange(fn: any) {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any) {
		this.onTouched = fn;
	}

	public onFilesChanged(files: FileList): void {
		this.onChange(this.isMultiple ? files : (files.length > 0 ? files[0] : null));
	}
}

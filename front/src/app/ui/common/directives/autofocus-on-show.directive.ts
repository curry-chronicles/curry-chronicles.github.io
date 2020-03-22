import { Directive, ElementRef, OnInit, Input, AfterViewInit } from '@angular/core';

@Directive({
	// tslint:disable-next-line: directive-selector
	selector: '[appAutofocusOnShow]',
})
export class AutofocusOnShowDirective implements AfterViewInit {

	@Input()
	public appAutofocusOnShow = true;

	constructor(private el: ElementRef) {
		if (el.nativeElement.focus == null) {
			throw new Error('Element does not accept focus.');
		}
	}

	public ngAfterViewInit(): void {
		if (!this.appAutofocusOnShow) {
			return;
		}
		setTimeout(() => {
			const input: HTMLInputElement = this.el.nativeElement as HTMLInputElement;
			input.focus();
			input.select();
		}, 0)
	}
}

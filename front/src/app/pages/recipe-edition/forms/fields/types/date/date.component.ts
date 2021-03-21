import { Component } from '@angular/core';
import { asIsoString } from '@curry-chronicles/shared';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'app-date',
	templateUrl: './date.component.html',
	styleUrls: ['./date.component.scss']
})
export class DateComponent extends FieldType {
	public value: any;
	public onchange(date: Date): void {
		this.formControl.setValue(asIsoString(date));
	}
}

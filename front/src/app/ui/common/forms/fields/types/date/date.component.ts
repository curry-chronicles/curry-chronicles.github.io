import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { asIsoString } from '../../../../../../utils';

@Component({
	selector: 'app-date',
	templateUrl: './date.component.html',
	styleUrls: ['./date.component.scss']
})
export class DateComponent extends FieldType {
	public value: any;
	public onchange(date: Date): void {
		this.formControl.setValue({ [this.key]: asIsoString(date) });
	}
}

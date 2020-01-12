import { Component, Input } from "@angular/core";
import { IDirection } from '../../models';

@Component({
	selector: 'app-directions-list',
	templateUrl: './directions-list.component.html',
	styleUrls: ['./directions-list.component.scss']
})
export class DirectionsListComponent {
	@Input()
	public directions: IDirection;
}

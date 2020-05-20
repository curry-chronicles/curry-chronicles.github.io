import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IDirection } from '@curry-chronicles/models';

@Component({
	selector: 'app-directions-list',
	templateUrl: './directions-list.component.html',
	styleUrls: ['./directions-list.component.scss']
})
export class DirectionsListComponent implements AfterViewInit {
	@Input()
	public directions: IDirection;

	@ViewChild('directionsList', { static: true })
	public directionsList: ElementRef<HTMLUListElement>;

	public ngAfterViewInit(): void {
		// Open pictures in new tab on click
		const pictures = this.directionsList.nativeElement.querySelectorAll('img');
		pictures.forEach(picture => {
			picture.onclick = () => window.open(picture.src, '_blank');
		});
	}
}

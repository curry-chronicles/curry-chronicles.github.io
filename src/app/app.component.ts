import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public title = 'Curry Chronicles';

	public lolNope(): void {
		window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
	}
}

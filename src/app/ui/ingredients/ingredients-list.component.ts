import { Component, OnInit, Input } from "@angular/core";
import { IIngredient } from '../../models';

@Component({
	selector: 'app-ingredients-list',
	templateUrl: './ingredients-list.component.html',
	styleUrls: ['./ingredients-list.component.scss']
})
export class IngredientsListComponent implements OnInit {

	@Input()
	public ingredients: IIngredient[];

	public ngOnInit(): void {

	}
}

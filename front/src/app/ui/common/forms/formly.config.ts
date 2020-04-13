import { ConfigOption } from '@ngx-formly/core';
import { TimespanComponent, IngredientsComponent, DirectionsComponent, PictureComponent, DateComponent } from './fields';

export const CURRY_CHRONICLES_FORMLY_CONFIG: ConfigOption = {
	types: [
		{
			name: 'timespan',
			component: TimespanComponent
		},
		{
			name: 'ingredients',
			component: IngredientsComponent
		},
		{
			name: 'directions',
			component: DirectionsComponent
		},
		{
			name: 'picture',
			component: PictureComponent
		},
		{
			name: 'date',
			component: DateComponent
		}
	]
};

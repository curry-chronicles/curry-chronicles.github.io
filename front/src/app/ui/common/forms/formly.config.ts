import { ConfigOption } from '@ngx-formly/core';
import { TimespanComponent, IngredientsComponent } from './fields';

export const CURRY_CHRONICLES_FORMLY_CONFIG: ConfigOption = {
	types: [
		{
			name: 'timespan',
			component: TimespanComponent
		},
		{
			name: 'ingredients',
			component: IngredientsComponent
		}
	]
};

import { Pipe, PipeTransform } from '@angular/core';
import { Timespan } from '@curry-chronicles/shared';

@Pipe({
	name: 'timespan'
})
export class TimespanPipe implements PipeTransform {
	public transform(input: string): string {
		const timespan = Timespan.parse(input);

		// Too long to display everything
		if (timespan.hours !== 0 && timespan.minutes !== 0 && timespan.seconds !== 0) {
			return timespan.toString();
		}

		if (timespan.hours !== 0 && timespan.minutes !== 0) {
			return `${timespan.hours}h${timespan.minutes < 10 ? '0' + timespan.minutes : timespan.minutes}mn`;
		}

		if (timespan.hours !== 0) {
			return `${timespan.hours} heure${timespan.hours > 1 ? 's' : ''}`;
		}

		if (timespan.minutes !== 0) {
			return `${timespan.minutes} minute${timespan.minutes > 1 ? 's' : ''}`;
		}

		return timespan.toString();
	}
}

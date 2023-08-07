import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'horaMilitar',
})
export class HoraMilitarPipe implements PipeTransform {
	transform(value: string) {
		const date = new Date(value);
		let hours = date.getHours();

		let formatedHours = '';

		if (hours < 10) {
			formatedHours += `0${hours}`;
		} else {
			formatedHours += `${hours == 24 ? '00' : hours}`;
		}

		return `${formatedHours}:${date.getMinutes()}`;
	}
}

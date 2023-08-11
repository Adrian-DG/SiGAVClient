import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'horaMilitar',
})
export class HoraMilitarPipe implements PipeTransform {
	transform(value: string) {
		const date = new Date(value);
		let hours = date.getHours();
		let minutes = date.getMinutes();

		console.log(hours);
		console.log(minutes);

		let formatedHours = '';
		let formatedMinutes = '';

		if (hours < 10) {
			formatedHours += `0${hours}`;
		} else {
			formatedHours += `${hours == 24 ? '00' : hours}`;
		}

		formatedMinutes += minutes >= 10 ? minutes : `0${minutes}`;

		return `${formatedHours}:${formatedMinutes}`;
	}
}

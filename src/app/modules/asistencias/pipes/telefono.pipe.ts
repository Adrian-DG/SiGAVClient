import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'telefono',
})
export class TelefonoPipe implements PipeTransform {
	transform(value: string): string {
		let validPhone = '';
		// Turn to array
		const characters = value.split('');
		for (let index = 0; index < characters.length; index++) {
			if (index == 3 || index == 6) {
				validPhone += '-';
			}
			validPhone += characters[index];
		}
		return validPhone;
	}
}

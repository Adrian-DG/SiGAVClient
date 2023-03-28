import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'cedula',
})
export class CedulaPipe implements PipeTransform {
	transform(value: string): string {
		let validCedula = '';
		// Turn to array
		const characters = value.split('');
		for (let index = 0; index < characters.length; index++) {
			if (index == 3 || index == 10) {
				validCedula += '-';
			}
			validCedula += characters[index];
		}
		return validCedula;
	}
}

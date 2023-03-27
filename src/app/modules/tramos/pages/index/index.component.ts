import { Component } from '@angular/core';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
})
export class IndexComponent {
	moduleInfo = {
		title: 'tramos',
		description: 'Este modulo permitira manejar los tramos en carretera',
		links: ['listado', 'crear'],
	};
}

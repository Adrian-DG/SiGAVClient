import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/services/auth/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'SiGAVClient';
	links: string[] = [
		'asistencias',
		'unidades',
		'tramos',
		'miembros',
		'usuarios',
	];

	miscelaneos = ['marcas', 'modelos', 'colores', 'tipo asistencias'];

	constructor(public _auth: AuthService) {}

	ngOnInit(): void {
		this._auth.checkIfAuthenticated();
	}

	logout(): void {
		this._auth.logout();
	}
}

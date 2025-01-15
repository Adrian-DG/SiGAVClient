import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/services/auth/auth.service';
import { IUserData } from './modules/auth/interfaces/iuser-data';
import { SpinnerService } from './modules/generic/services/spinner/spinner.service';

export enum RolUser {
	ANALISTA_OPERACIONES = 1,
	OPERADOR_R5,
	GESTION_OPERATIVA,
	CALIDAD,
	PREHOSPITALARIA,
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'SiGAVClient';
	links: string[] = [
		'preHospitalaria',
		'asistencias',
		'hospitales',
		'unidades',
		'tramos',
		'miembros',
		'usuarios',
		'actividades',
	];

	constructor(public _auth: AuthService, public _spinner: SpinnerService) {}

	public Roles = RolUser;

	ngOnInit(): void {
		this._auth.checkIfAuthenticated();
	}

	logout(): void {
		this._auth.logout();
	}
}

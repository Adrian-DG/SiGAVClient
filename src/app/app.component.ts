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

interface IMenuItem {
	label: string;
	route: string;
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'SiGAVClient';
	readonly menuItems: IMenuItem[] = [
		{ label: 'INICIO', route: 'home' },
		{ label: 'ASISTENCIAS', route: 'asistencias/listado' },
		{ label: 'REPORTES', route: 'reportes' },
		{ label: 'BUSQUEDA AVANZADA', route: 'busqueda-avanzada' },
		{ label: 'DENOMINACIONES', route: 'denominaciones/listado' },
		{ label: 'UNIDADES', route: 'unidades/listado' },
		{ label: 'TRAMOS', route: 'tramos/listado' },
		{ label: 'MIEMBROS', route: 'miembros/listado' },
		{ label: 'USUARIOS', route: 'usuarios/listado' },
	];

	constructor(
		public _auth: AuthService,
		public _spinner: SpinnerService,
	) {}

	ngOnInit(): void {
		this._auth.checkIfAuthenticated();
	}

	logout(): void {
		this._auth.logout();
	}

	canViewMainMenu(user: IUserData): boolean {
		return (
			user.esAdministrador ||
			user.rolUsuario === RolUser.ANALISTA_OPERACIONES
		);
	}

	trackByRoute(_: number, item: IMenuItem): string {
		return item.route;
	}
}

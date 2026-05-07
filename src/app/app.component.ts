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
	icon: string;
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'SiGAVClient';
	readonly menuItems: IMenuItem[] = [
		{ label: 'INICIO', route: 'home', icon: 'home' },
		{
			label: 'ASISTENCIAS',
			route: 'asistencias/listado',
			icon: 'medical_services',
		},
		{ label: 'REPORTES', route: 'reportes', icon: 'assessment' },
		{
			label: 'BUSQUEDA AVANZADA',
			route: 'busqueda-avanzada',
			icon: 'manage_search',
		},
		{
			label: 'DENOMINACIONES',
			route: 'denominaciones/listado',
			icon: 'badge',
		},
		{
			label: 'UNIDADES',
			route: 'unidades/listado',
			icon: 'directions_car',
		},
		{
			label: 'ACTUALIZAR UNIDADES',
			route: 'actualizar-unidades',
			icon: 'edit_road',
		},
		{ label: 'TRAMOS', route: 'tramos/listado', icon: 'alt_route' },
		{ label: 'MIEMBROS', route: 'miembros/listado', icon: 'groups' },
		{ label: 'USUARIOS', route: 'usuarios/listado', icon: 'person' },
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

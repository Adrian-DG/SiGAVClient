import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/services/auth/auth.service';
import { IUserData } from './modules/auth/interfaces/iuser-data';
import { SpinnerService } from './modules/generic/services/spinner/spinner.service';

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

	constructor(public _auth: AuthService, public _spinner: SpinnerService) {}

	ngOnInit(): void {
		this._auth.checkIfAuthenticated();
	}

	logout(): void {
		this._auth.logout();
	}
}

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { GenericService } from 'src/app/modules/generic/services/generic/generic.service';
import { ILoginUser } from '../../DTO/ilogin-user';
import { IUserData } from '../../interfaces/iuser-data';
import { ILoginResponse } from '../../responses/ilogin-response';
import { JwtTokenService } from '../jwt/jwt.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SpinnerService } from 'src/app/modules/generic/services/spinner/spinner.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService extends GenericService {
	private isAuthenticatedSource = new BehaviorSubject<boolean>(false);
	public isAuthenticated$ = this.isAuthenticatedSource.asObservable();

	private userDataSource = new ReplaySubject<IUserData>();
	public userData$ = this.userDataSource.asObservable();

	GetResource(): string {
		return 'auth';
	}

	constructor(
		protected override $http: HttpClient,
		protected override $router: Router,
		private _jwt: JwtTokenService,
		private _snackbar: MatSnackBar,
		private _spinner: SpinnerService
	) {
		super($http, $router);
	}

	checkIfAuthenticated(): void {
		const token = sessionStorage.getItem('token');
		if (token != null) {
			this.isAuthenticatedSource.next(!this._jwt.DidTokenExpire(token));
			this.getUserData();
		} else {
			this.isAuthenticatedSource.next(false);
		}
	}

	private saveUserData(response: ILoginResponse): void {
		for (const [key, value] of Object.entries(response)) {
			sessionStorage.setItem(key, value);
		}
	}

	getUserData(): void {
		const userId = sessionStorage.getItem('usuarioId');
		const username = sessionStorage.getItem('usuario');
		const esAdministrador = sessionStorage.getItem('esAdministrador');
		const permisos = sessionStorage.getItem('permisos');

		// console.log('session info', {
		// 	userId,
		// 	username,
		// 	esAdministrador,
		// 	permisos,
		// });

		if (
			userId != null &&
			username != null &&
			esAdministrador != null &&
			permisos != null
		) {
			const userInfo: IUserData = {
				usuarioId: parseInt(userId),
				usuario: username,
				esAdministrador: esAdministrador === 'true',
				permisos: permisos.split(',').map((x) => parseInt(x)),
			};
			console.log('userInfo ', userInfo);
			this.userDataSource.next(userInfo);
		}
	}

	loginUser(model: ILoginUser): void {
		this.$http
			.post<ILoginResponse>(`${this.endPoint}/login`, model)
			.subscribe((response: ILoginResponse) => {
				if (response.status) {
					this.saveUserData(response);
					this.isAuthenticatedSource.next(response.status);
					// navigate to home
					this.$router.navigateByUrl('/asistencias/listado');
				}

				const snackBarConfig: MatSnackBarConfig = { duration: 2000 };
				this._snackbar.open(
					response.message,
					'ocultar',
					snackBarConfig
				);
			});
	}

	logout(): void {
		sessionStorage.clear();
		window.location.reload();
	}
}

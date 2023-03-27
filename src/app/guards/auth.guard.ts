import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/auth/services/auth/auth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private _auth: AuthService, private $router: Router) {
		this._auth.checkIfAuthenticated();
	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		let isAuthenticated: boolean = false;
		this._auth.isAuthenticated$.subscribe((state: boolean) => {
			isAuthenticated = state;
			if (!isAuthenticated) {
				this.$router.navigate(['']);
			}
		});
		console.log('is authenticated: ' + isAuthenticated);
		return isAuthenticated;
	}
}

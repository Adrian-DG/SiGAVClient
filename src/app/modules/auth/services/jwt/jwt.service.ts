import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
	providedIn: 'root',
})
export class JwtTokenService {
	private helper!: JwtHelperService;
	constructor() {
		this.helper = new JwtHelperService();
	}

	DidTokenExpire(token: string): boolean {
		return this.helper.isTokenExpired(token);
	}
}

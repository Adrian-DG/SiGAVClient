import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { GenericService } from 'src/app/modules/generic/services/generic/generic.service';
import { ILoginUser } from '../../DTO/ilogin-user';
import { ILoginResponse } from '../../responses/ilogin-response';

@Injectable({
	providedIn: 'root',
})
export class AuthService extends GenericService {
	private isAuthenticatedSoure = new BehaviorSubject<boolean>(false);
	public isAuthenticated$ = this.isAuthenticatedSoure.asObservable();
	GetResource(): string {
		return 'auth';
	}

	constructor(protected override $http: HttpClient) {
		super($http);
	}

	private saveUserData(response: ILoginResponse): void {
		for (const [key, value] of Object.entries(response)) {
			sessionStorage.setItem(key, value);
		}
	}

	loginUser(model: ILoginUser): void {
		this.$http
			.post<ILoginResponse>(`${this.endPoint}/login`, model)
			.subscribe((response: ILoginResponse) => {
				if (response.status) {
					this.saveUserData(response);
					this.isAuthenticatedSoure.next(response.status);
					// navigate to home
				}
			});
	}
}

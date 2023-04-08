import { Injectable, isDevMode } from '@angular/core';
import { environment as Prod } from 'src/environment/environment.prod';
import { environment as Dev } from 'src/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPaginationFilters } from '../../DTO/ipagination-filters';
import { IServerResponse } from '../../Responses/iserver-response';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { IUserData } from 'src/app/modules/auth/interfaces/iuser-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IPagedData } from '../../Responses/ipaged-data';

@Injectable({
	providedIn: 'root',
})
export abstract class GenericService {
	protected readonly endPoint: string = '';
	abstract GetResource(): string;
	public readonly userId: number = 0;

	private isLoadingSource = new BehaviorSubject<boolean>(false);
	public isLoading$ = this.isLoadingSource.asObservable();

	setLoading(state: boolean) {
		this.isLoadingSource.next(state);
	}

	getPaginationParams(filters: IPaginationFilters): HttpParams {
		return new HttpParams()
			.set('page', filters.page)
			.set('size', filters.size)
			.set('searchTerm', filters.searchTerm)
			.set('status', filters.status);
	}

	constructor(protected $http: HttpClient) {
		const env: string = isDevMode() ? Dev.api_url : Prod.api_url;
		this.endPoint += `${env}/${this.GetResource()}`;

		const usuarioId = sessionStorage.getItem('usuarioId');
		if (usuarioId != null) {
			this.userId = parseInt(usuarioId);
		}
	}

	Get<T>(filters: IPaginationFilters): Observable<IPagedData<T>> {
		return this.$http.get<IPagedData<T>>(`${this.endPoint}`, {
			params: this.getPaginationParams(filters),
		});
	}

	Post<T>(model: T): void {
		this.$http
			.post<IServerResponse>(this.endPoint, model)
			.subscribe((response: IServerResponse) => alert(response.message));
	}
}

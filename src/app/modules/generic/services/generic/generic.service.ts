import { Injectable, isDevMode } from '@angular/core';
import { Location as actualPage } from '@angular/common';
import { environment as Prod } from 'src/environment/environment.prod';
import { environment as Dev } from 'src/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPaginationFilters } from '../../DTO/ipagination-filters';
import { IServerResponse } from '../../Responses/iserver-response';
import { BehaviorSubject, Observable } from 'rxjs';
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

	constructor(protected $http: HttpClient, protected $location: actualPage) {
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

	GetById<T>(id: number): Observable<T> {
		return this.$http.get<T>(`${this.endPoint}/${id}`);
	}

	Post<T>(model: T): void {
		this.$http
			.post<IServerResponse>(this.endPoint, model)
			.subscribe((response: IServerResponse) => alert(response.message));
	}

	PostConfirm<T>(model: T): void {
		this.$http
			.post<IServerResponse>(`${this.endPoint}/create`, model)
			.subscribe((response: IServerResponse) => alert(response.message));
	}

	Update<T>(model: T): void {
		if (confirm('Estas seguro de guardar estos cambios')) {
			this.$http.put<IServerResponse>(this.endPoint, model).subscribe(
				(response: IServerResponse) => {
					alert(response.message);
					this.$location.back();
				},
				(error) =>
					alert(
						'Error: Algo salio mal al intentar guardar los cambios'
					)
			);
		}
	}
}

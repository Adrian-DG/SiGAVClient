import { Injectable, isDevMode } from '@angular/core';
import { environment as Prod } from 'src/environment/environment.prod';
import { environment as Dev } from 'src/environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPaginationFilters } from '../../interfaces/ipagination-filters';

@Injectable({
	providedIn: 'root',
})
export abstract class GenericService {
	protected readonly endPoint: string = '';
	abstract GetResource(): string;

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
	}
}

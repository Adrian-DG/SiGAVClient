import { Injectable } from '@angular/core';
import { GenericService } from '../../generic/services/generic/generic.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IServerResponse } from '../../generic/Responses/iserver-response';
import { IDenominacionesCreate } from '../interfaces/idenominaciones-create';
import { Observable } from 'rxjs';
import { IPaginationFilters } from '../../generic/DTO/ipagination-filters';
import { IPagedData } from '../../generic/Responses/ipaged-data';

@Injectable({
	providedIn: 'root',
})
export class DenominacionesService extends GenericService {
	override GetResource(): string {
		return 'denominaciones';
	}

	constructor(
		protected override $http: HttpClient,
		protected override $router: Router,
	) {
		super($http, $router);
	}

	CreateNewDenominacion(
		model: IDenominacionesCreate,
	): Observable<IServerResponse> {
		return this.$http.post<IServerResponse>(
			`${this.endPoint}/create-new-denominacion`,
			model,
		);
	}

	getAllDenominaciones(filters: IPaginationFilters) {
		return this.$http.get<IPagedData<any>>(
			`${this.endPoint}/all-denominaciones`,
			{
				params: this.getPaginationParams(filters),
			},
		);
	}
}

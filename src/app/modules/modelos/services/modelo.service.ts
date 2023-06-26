import { Injectable } from '@angular/core';
import { GenericService } from '../../generic/services/generic/generic.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { IPaginationFilters } from '../../generic/DTO/ipagination-filters';
import { Observable } from 'rxjs';
import { IPagedData } from '../../generic/Responses/ipaged-data';
import { IModeloViewModel } from '../viewmodels/imodelo-view-model';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class ModeloService extends GenericService {
	override GetResource(): string {
		return 'modelos';
	}

	constructor(
		protected override $http: HttpClient,
		protected override $router: Router
	) {
		super($http, $router);
	}

	getAllModelos(
		filters: IPaginationFilters
	): Observable<IPagedData<IModeloViewModel>> {
		return this.$http.get<IPagedData<IModeloViewModel>>(
			`${this.endPoint}/all`,
			{ params: this.getPaginationParams(filters) }
		);
	}
}

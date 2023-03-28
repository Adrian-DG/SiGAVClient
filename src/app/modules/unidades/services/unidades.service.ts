import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaginationFilters } from '../../generic/DTO/ipagination-filters';
import { IPagedData } from '../../generic/Responses/ipaged-data';
import { GenericService } from '../../generic/services/generic/generic.service';
import { IUnidadViewModel } from '../viewModels/iunidad-view-model';

@Injectable({
	providedIn: 'root',
})
export class UnidadesService extends GenericService {
	constructor(protected override $http: HttpClient) {
		super($http);
	}

	GetResource(): string {
		return 'unidades';
	}

	getAllUnidades(
		filters: IPaginationFilters
	): Observable<IPagedData<IUnidadViewModel>> {
		return this.$http.get<IPagedData<IUnidadViewModel>>(
			`${this.endPoint}/all`,
			{ params: this.getPaginationParams(filters) }
		);
	}
}

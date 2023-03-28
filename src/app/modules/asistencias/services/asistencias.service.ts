import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaginationFilters } from '../../generic/DTO/ipagination-filters';
import { IPagedData } from '../../generic/Responses/ipaged-data';
import { GenericService } from '../../generic/services/generic/generic.service';
import { IAsistenciaViewModel } from '../viewModels/iasistencia-view-model';

@Injectable({
	providedIn: 'root',
})
export class AsistenciasService extends GenericService {
	GetResource(): string {
		return 'asistencias';
	}

	constructor(protected override $http: HttpClient) {
		super($http);
	}

	getAllAsistencias(
		filters: IPaginationFilters
	): Observable<IPagedData<IAsistenciaViewModel>> {
		return this.$http.get<IPagedData<IAsistenciaViewModel>>(
			`${this.endPoint}/all`,
			{ params: this.getPaginationParams(filters) }
		);
	}
}

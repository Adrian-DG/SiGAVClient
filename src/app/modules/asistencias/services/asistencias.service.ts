import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaginationFilters } from '../../generic/DTO/ipagination-filters';
import { IPagedData } from '../../generic/Responses/ipaged-data';
import { IServerResponse } from '../../generic/Responses/iserver-response';
import { GenericService } from '../../generic/services/generic/generic.service';
import { IAsistenciaR5Create } from '../DTO/iasistencia-r5-create';
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

	createAsistencia(model: IAsistenciaR5Create): void {
		console.log('Create asistencia: ', model);
		this.$http
			.post<IServerResponse>(`${this.endPoint}/createR5`, model)
			.subscribe((response: IServerResponse) => {
				alert(response.message);
			});
	}

	updateAsistenciaCompletar(id: number): void {
		if (confirm('Esta seguro de completar esta asistencia ?')) {
			this.$http
				.put<boolean>(`${this.endPoint}/${id}`, id)
				.subscribe((response: boolean) =>
					alert(
						response
							? 'Se han guardado los cambios'
							: 'Algo salio mal al actualizar asistencia'
					)
				);
		}
	}
}

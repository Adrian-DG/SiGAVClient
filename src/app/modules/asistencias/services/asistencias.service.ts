import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { IPaginationFilters } from '../../generic/DTO/ipagination-filters';
import { IPagedData } from '../../generic/Responses/ipaged-data';
import { IServerResponse } from '../../generic/Responses/iserver-response';
import { GenericService } from '../../generic/services/generic/generic.service';
import { IAsistenciaR5Create } from '../DTO/iasistencia-r5-create';
import { IUpdateAsistencia } from '../DTO/iupdate-asistencia';
import { IAsistenciaViewModel } from '../viewModels/iasistencia-view-model';
import { IDateFilter } from '../DTO/idate-filter';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AsistenciasService extends GenericService {
	GetResource(): string {
		return 'asistencias';
	}

	constructor(protected override $http: HttpClient, private $router: Router) {
		super($http);
	}

	getAllAsistencias(
		filters: IPaginationFilters
	): Observable<IPagedData<IAsistenciaViewModel>> {
		return this.$http.get<IPagedData<IAsistenciaViewModel>>(
			`${this.endPoint}/all`,
			{
				params: this.getPaginationParams(filters),
			}
		);
	}

	createAsistencia(model: IAsistenciaR5Create): void {
		console.log('Create asistencia: ', model);
		this.$http
			.post<IServerResponse>(`${this.endPoint}/createR5`, model)
			.subscribe((response: IServerResponse) => {
				alert(response.message);
				if (response.status) {
					this.$router.navigate(['asistencias/listado']);
				}
			});
	}

	updateAsistenciaCompletar(model: IUpdateAsistencia): void {
		// TODO: revisar el estatus en que se colocan las asistencias
		const estatus = model.estatusAsistencia == 2 ? 'comenzar' : 'completar';
		if (confirm(`Esta seguro de ${estatus} esta asistencia ?`)) {
			this.$http
				.put<IServerResponse>(`${this.endPoint}/actualizar`, model)
				.subscribe((response: IServerResponse) => {
					//alert(response.message);
					if (response.status) {
						this.getAllAsistencias({
							page: 0,
							size: 5,
							searchTerm: '',
							status: false,
						});
					}
				});
		}
	}

	getReporteResumenAsistenciasPorFecha(filter: IDateFilter): void {
		const params = new HttpParams()
			.set('initialDate', filter.initialDate.toDateString())
			.set('finalDate', filter.finalDate.toDateString());
		this.$http.get(`${this.endPoint}/reporte/resumen_fecha`, {
			params: params,
		});
	}

	GetReporteResumenAsistenciasDiario() {
		return this.$http.get(`${this.endPoint}/reporte/resumen_diario`, {
			observe: 'response',
			responseType: 'blob',
		});
	}
}

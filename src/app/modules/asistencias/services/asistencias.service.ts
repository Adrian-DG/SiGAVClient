import { HttpClient, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
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
import { SpinnerService } from '../../generic/services/spinner/spinner.service';

@Injectable({
	providedIn: 'root',
})
export class AsistenciasService extends GenericService {
	GetResource(): string {
		return 'asistencias';
	}

	constructor(
		protected override $http: HttpClient,
		protected override $router: Router,
		private _spinner: SpinnerService
	) {
		super($http, $router);
	}

	showSpinner(): void {
		this._spinner.setLoading(true);
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

	updateAsistenciaCompletar(
		model: IUpdateAsistencia
	): Observable<IServerResponse> {
		const estatus = model.estatusAsistencia == 2 ? 'comenzar' : 'completar';
		return this.$http.put<IServerResponse>(
			`${this.endPoint}/actualizar`,
			model
		);
	}

	getReporteResumenAsistenciasPorFecha(filter: IDateFilter) {
		const params = new HttpParams()
			.set('initialDate', filter.initialDate.toDateString())
			.set('finalDate', filter.finalDate.toDateString());
		return this.$http.get(`${this.endPoint}/reporte/resumen_fecha`, {
			observe: 'response',
			responseType: 'blob',
			params: params,
		});
	}

	GetReporteResumenAsistenciasDiario() {
		return this.$http.get(`${this.endPoint}/reporte/resumen_diario`, {
			observe: 'response',
			responseType: 'blob',
		});
	}

	GetReporteDetalleAsistencias() {
		return this.$http.get(`${this.endPoint}/reporte/resumen_detalles`, {
			observe: 'response',
			responseType: 'blob',
		});
	}

	GetImagenes(id: number): Observable<string[]> {
		return this.$http.get<string[]>(`${this.endPoint}/${id}/imagenes`);
	}
}

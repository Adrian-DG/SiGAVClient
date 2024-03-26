import { HttpClient, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable, filter, finalize } from 'rxjs';
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
import { IReassignUnit } from '../DTO/ireassign-unit';
import { IHistoricoViewModel } from '../viewModels/ihistorico-view-model';
import { IAsistenciaPaginationFilter } from '../DTO/iasistencia-pagination-filter';
import { IAsistenciaEdit } from '../DTO/iasistencia-edit';

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

	getAsistenciaPaginationParams(
		filters: IAsistenciaPaginationFilter
	): HttpParams {
		return new HttpParams()
			.set('page', filters.page)
			.set('size', filters.size)
			.set('searchTerm', filters.searchTerm)
			.set('status', filters.status)
			.set('estatusAsistencia', filters.estatusAsistencia);
	}

	getAllAsistencias(
		filters: IAsistenciaPaginationFilter
	): Observable<IPagedData<IAsistenciaViewModel>> {
		return this.$http.get<IPagedData<IAsistenciaViewModel>>(
			`${this.endPoint}/all`,
			{
				params: this.getAsistenciaPaginationParams(filters),
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

	changeUnidadAsignada(model: IReassignUnit): Observable<boolean> {
		model.usuarioId = this.userId;
		return this.$http.post<boolean>(`${this.endPoint}/reasignar`, model);
	}

	GetHistorialAsistencia(id: number): Observable<IHistoricoViewModel[]> {
		return this.$http.get<IHistoricoViewModel[]>(
			`${this.endPoint}/historial`,
			{ params: new HttpParams().set('IdAsistencia', id) }
		);
	}

	GetReporteEstadistico(filterType: number, dateFilter: IDateFilter) {
		const params = new HttpParams()
			.set('filter', filterType)
			.set('initialDate', dateFilter.initialDate.toDateString())
			.set('finalDate', dateFilter.finalDate.toDateString());
		return this.$http.get(`${this.endPoint}/reporte/estadistico`, {
			observe: 'response',
			responseType: 'blob',
			params: params,
		});
	}

	CompletarInformacionAsistencia(model: IAsistenciaEdit): void {
		this.$http.put<boolean>(`${this.endPoint}/edit`, model).subscribe(
			(response: boolean) => alert('Se han guardado los cambios'),
			(error) =>
				alert('Error: Algo salio mal al intentar guardar los cambios')
		);
	}
}

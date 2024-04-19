import { Injectable } from '@angular/core';
import { GenericService } from '../../generic/services/generic/generic.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IAsisteciaPreHospitalariaViewModel } from '../interfaces/iasistecia-pre-hospitalaria-view-model';
import { IPagedData } from '../../generic/Responses/ipaged-data';
import { IAsistenciaViewModel } from '../../asistencias/viewModels/iasistencia-view-model';
import { IAsistenciaPaginationFilter } from '../../asistencias/DTO/iasistencia-pagination-filter';
import { IDateFilter } from '../../asistencias/DTO/idate-filter';
import { IAsistenciaPreHospitalariaDetails } from '../interfaces/iasistencia-pre-hospitalaria-details';

@Injectable({
	providedIn: 'root',
})
export class AsistenciPreHospitalariaService extends GenericService {
	override GetResource(): string {
		return 'pre-hospitalaria';
	}

	constructor(
		protected override $http: HttpClient,
		protected override $router: Router
	) {
		super($http, $router);
	}

	GetAsistenciaPreHospitalaria(
		filters: IAsistenciaPaginationFilter
	): Observable<IPagedData<IAsisteciaPreHospitalariaViewModel>> {
		const params = new HttpParams()
			.set('page', filters.page)
			.set('size', filters.size)
			.set('searchTerm', filters.searchTerm)
			.set('status', filters.status)
			.set('estatusAsistencia', filters.estatusAsistencia);
		return this.$http.get<IPagedData<IAsisteciaPreHospitalariaViewModel>>(
			`${this.endPoint}/all`,
			{ params: params }
		);
	}

	GetListadoAsistenciaDetallesPorFecha(dateFilter: IDateFilter) {
		const params = new HttpParams()
			.set('initialDate', dateFilter.initialDate.toDateString())
			.set('finalDate', dateFilter.finalDate.toDateString());

		return this.$http.get(`${this.endPoint}/reporte-por-fecha`, {
			observe: 'response',
			responseType: 'blob',
			params: params,
		});
	}

	CompletaAsistencia(id: number): void {
		this.$http
			.put<boolean>(`${this.endPoint}/${id}`, {})
			.subscribe((response: boolean) => {
				alert(
					response
						? 'Se han guardado los cambios'
						: 'Error: no se pudieron guardar los cambios'
				);
			});
	}

	GetAsistenciaPreHospitalariaDetails(
		id: number
	): Observable<IAsistenciaPreHospitalariaDetails> {
		return this.$http.get<IAsistenciaPreHospitalariaDetails>(
			`${this.endPoint}/${id}/details`
		);
	}

	GetAsistenciaPreHospitalariaById(id: number): Observable<any> {
		return this.$http.get<any>(`${this.endPoint}/${id}/edit-details`);
	}
}

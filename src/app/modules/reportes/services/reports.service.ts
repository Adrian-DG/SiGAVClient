import { Injectable } from '@angular/core';
import { GenericService } from '../../generic/services/generic/generic.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { IStatsFilterDTO } from '../interfaces/istats-filter-dto';
import { IReportData } from '../interfaces/ireport-data';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ReportsService extends GenericService {
	override GetResource(): string {
		return 'reportes';
	}

	constructor(
		protected override $http: HttpClient,
		protected override $router: Router,
	) {
		super($http, $router);
	}

	private GetStatsParams(filters: IStatsFilterDTO): HttpParams {
		return new HttpParams()
			.set('estatus', filters.estatus)
			.set('initial', filters.initial.toDateString())
			.set('final', filters.final.toDateString());
	}

	getStatsRegiones(filters: IStatsFilterDTO): Observable<IReportData[]> {
		const params = this.GetStatsParams(filters);
		return this.$http.get<IReportData[]>(`${this.endPoint}/regiones`, {
			params: params,
		});
	}

	getStatsProvincia(filters: IStatsFilterDTO): Observable<IReportData[]> {
		const params = this.GetStatsParams(filters);
		return this.$http.get<IReportData[]>(`${this.endPoint}/provincias`, {
			params: params,
		});
	}

	getStatsTramo(filters: IStatsFilterDTO): Observable<IReportData[]> {
		const params = this.GetStatsParams(filters);
		return this.$http.get<IReportData[]>(`${this.endPoint}/tramos`, {
			params: params,
		});
	}

	getStatsTipoVehiculo(filters: IStatsFilterDTO): Observable<IReportData[]> {
		const params = this.GetStatsParams(filters);
		return this.$http.get<IReportData[]>(`${this.endPoint}/tipoVehiculos`, {
			params: params,
		});
	}

	getStatsByEstatus(filters: IStatsFilterDTO): Observable<IReportData[]> {
		const params = this.GetStatsParams(filters);
		return this.$http.get<IReportData[]>(`${this.endPoint}/estatus`, {
			params: params,
		});
	}

	getStatsReportadoPor(filters: IStatsFilterDTO): Observable<IReportData[]> {
		const params = this.GetStatsParams(filters);
		return this.$http.get<IReportData[]>(`${this.endPoint}/reportadoPor`, {
			params: params,
		});
	}

	getStatsTipoCategoria(
		filters: IStatsFilterDTO | null,
	): Observable<IReportData[]> {
		if (filters === null) {
			return this.$http.get<IReportData[]>(
				`${this.endPoint}/tipoCategoria`,
				{ params: new HttpParams() },
			);
		}

		const params = this.GetStatsParams(filters);
		return this.$http.get<IReportData[]>(`${this.endPoint}/tipoCategoria`, {
			params: params,
		});
	}

	getStatsTipoAsistencia(
		filters: IStatsFilterDTO | null,
	): Observable<IReportData[]> {
		if (filters === null) {
			return this.$http.get<IReportData[]>(
				`${this.endPoint}/tipoAsistencia`,
				{ params: new HttpParams() },
			);
		}

		const params = this.GetStatsParams(filters);
		return this.$http.get<IReportData[]>(
			`${this.endPoint}/tipoAsistencia`,
			{
				params: params,
			},
		);
	}

	getStatsTipoUnidad(filters: IStatsFilterDTO): Observable<IReportData[]> {
		const params = this.GetStatsParams(filters);
		return this.$http.get<IReportData[]>(`${this.endPoint}/tipoUnidad`, {
			params: params,
		});
	}

	getTotalAsistencias(): Observable<number> {
		return this.$http.get<number>(`${this.endPoint}/total-asistencias`);
	}
}

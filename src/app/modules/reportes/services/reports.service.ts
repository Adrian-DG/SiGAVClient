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
		protected override $router: Router
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
}

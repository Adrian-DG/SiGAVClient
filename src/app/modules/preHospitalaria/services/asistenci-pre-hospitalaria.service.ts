import { Injectable } from '@angular/core';
import { GenericService } from '../../generic/services/generic/generic.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IAsisteciaPreHospitalariaViewModel } from '../interfaces/iasistecia-pre-hospitalaria-view-model';
import { IPagedData } from '../../generic/Responses/ipaged-data';
import { IAsistenciaViewModel } from '../../asistencias/viewModels/iasistencia-view-model';
import { IAsistenciaPaginationFilter } from '../../asistencias/DTO/iasistencia-pagination-filter';

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
}

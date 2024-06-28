import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic/services/generic/generic.service';
import { IHospital } from '../interfaces/ihospital';
import { Router } from '@angular/router';
import { IPagedData } from '../../generic/Responses/ipaged-data';
import { IPaginationFilters } from '../../generic/DTO/ipagination-filters';
import { IHospitalCreateDto } from '../interfaces/ihospital-create.dto';
import { IServerResponse } from '../../generic/Responses/iserver-response';

@Injectable({
	providedIn: 'root',
})
export class HospitalesService extends GenericService {
	override GetResource(): string {
		return 'hospitales';
	}

	constructor(
		protected override $http: HttpClient,
		protected override $router: Router
	) {
		super($http, $router);
	}

	getAllHospitales(filters: IPaginationFilters) {
		return this.$http.get<IPagedData<IHospital>>(`${this.endPoint}/all`, {
			params: this.getPaginationParams(filters),
		});
	}

	create(model: IHospitalCreateDto) {
		return this.$http.post<IServerResponse>(`${this.endPoint}/new-hospital`, model)
	}
}

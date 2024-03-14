import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic/services/generic/generic.service';
import { IHospital } from '../interfaces/ihospital';
import { Router } from '@angular/router';
import { IPagedData } from '../../generic/Responses/ipaged-data';

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
}

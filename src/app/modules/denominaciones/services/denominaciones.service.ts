import { Injectable } from '@angular/core';
import { GenericService } from '../../generic/services/generic/generic.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IServerResponse } from '../../generic/Responses/iserver-response';
import { IDenominacionesCreate } from '../interfaces/idenominaciones-create';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DenominacionesService extends GenericService {
	override GetResource(): string {
		return 'denominaciones';
	}

	constructor(
		protected override $http: HttpClient,
		protected override $router: Router
	) {
		super($http, $router);
	}

	CreateNewDenominacion(
		model: IDenominacionesCreate
	): Observable<IServerResponse> {
		return this.$http.post<IServerResponse>(
			`${this.endPoint}/create-new-denominacion`,
			model
		);
	}
}

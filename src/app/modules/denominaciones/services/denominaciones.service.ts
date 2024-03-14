import { Injectable } from '@angular/core';
import { GenericService } from '../../generic/services/generic/generic.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
}

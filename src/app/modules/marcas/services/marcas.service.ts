import { Injectable } from '@angular/core';
import { GenericService } from '../../generic/services/generic/generic.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { INombreModelMetadata } from '../../generic/abstraction/inombre-model-metadata';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class MarcasService extends GenericService {
	override GetResource(): string {
		return 'marcas';
	}

	constructor(
		protected override $http: HttpClient,
		protected override $router: Router
	) {
		super($http, $router);
	}
}

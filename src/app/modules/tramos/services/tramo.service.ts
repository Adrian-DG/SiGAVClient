import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaginationFilters } from '../../generic/DTO/ipagination-filters';
import { IPagedData } from '../../generic/Responses/ipaged-data';
import { GenericService } from '../../generic/services/generic/generic.service';
import { ITramoViewModel } from '../viewModels/itramo-view-model';

@Injectable({
	providedIn: 'root',
})
export class TramoService extends GenericService {
	GetResource(): string {
		return 'tramos';
	}

	constructor(protected override $http: HttpClient) {
		super($http);
	}

	getAllTramos(
		filters: IPaginationFilters
	): Observable<IPagedData<ITramoViewModel>> {
		return this.$http.get<IPagedData<ITramoViewModel>>(
			`${this.endPoint}/all`,
			{ params: this.getPaginationParams(filters) }
		);
	}
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaginationFilters } from '../../generic/DTO/ipagination-filters';
import { IPagedData } from '../../generic/Responses/ipaged-data';
import { GenericService } from '../../generic/services/generic/generic.service';
import { IMiembroViewModel } from '../viewModels/imiembro-view-model';

@Injectable({
	providedIn: 'root',
})
export class MiembroService extends GenericService {
	GetResource(): string {
		return 'miembros';
	}

	constructor(protected override $http: HttpClient) {
		super($http);
	}

	getAllMiembros(
		filters: IPaginationFilters
	): Observable<IPagedData<IMiembroViewModel>> {
		return this.$http.get<IPagedData<IMiembroViewModel>>(
			`${this.endPoint}/all`,
			{ params: this.getPaginationParams(filters) }
		);
	}
}

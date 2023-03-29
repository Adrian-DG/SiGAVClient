import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPaginationFilters } from '../../generic/DTO/ipagination-filters';
import { IPagedData } from '../../generic/Responses/ipaged-data';
import { GenericService } from '../../generic/services/generic/generic.service';
import { IUnidadAutoComplete } from '../viewModels/iunidad-auto-complete';
import { IUnidadViewModel } from '../viewModels/iunidad-view-model';

@Injectable({
	providedIn: 'root',
})
export class UnidadesService extends GenericService {
	private unidadesAutocomplteSource = new BehaviorSubject<
		IUnidadAutoComplete[]
	>([]);
	public unidadeAutocomplete$ = this.unidadesAutocomplteSource.asObservable();
	constructor(protected override $http: HttpClient) {
		super($http);
	}

	GetResource(): string {
		return 'unidades';
	}

	getAllUnidades(
		filters: IPaginationFilters
	): Observable<IPagedData<IUnidadViewModel>> {
		return this.$http.get<IPagedData<IUnidadViewModel>>(
			`${this.endPoint}/all`,
			{ params: this.getPaginationParams(filters) }
		);
	}

	getUnidadesAutoComplete(param: string): void {
		const params = new HttpParams().set('param', param);
		this.$http
			.get<IUnidadAutoComplete[]>(`${this.endPoint}/autocomplete`, {
				params: params,
			})
			.subscribe((data: IUnidadAutoComplete[]) =>
				this.unidadesAutocomplteSource.next(data)
			);
	}
}

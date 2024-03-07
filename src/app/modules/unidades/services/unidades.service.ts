import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPaginationFilters } from '../../generic/DTO/ipagination-filters';
import { IPagedData } from '../../generic/Responses/ipaged-data';
import { GenericService } from '../../generic/services/generic/generic.service';
import { IUnidadAutoComplete } from '../viewModels/iunidad-auto-complete';
import { IUnidadViewModel } from '../viewModels/iunidad-view-model';
import { Router } from '@angular/router';
import { SpinnerService } from '../../generic/services/spinner/spinner.service';
import { IUnidad } from '../entities/iunidad';

@Injectable({
	providedIn: 'root',
})
export class UnidadesService extends GenericService {
	private unidadesAutocomplteSource = new BehaviorSubject<
		IUnidadAutoComplete[]
	>([]);
	public unidadeAutocomplete$ = this.unidadesAutocomplteSource.asObservable();
	constructor(
		protected override $http: HttpClient,
		protected override $router: Router,
		private _spinner: SpinnerService
	) {
		super($http, $router);
	}

	showSpinner(): void {
		this._spinner.setLoading(true);
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

	GetUnidadesPorTramo(tramoId: number): Observable<IUnidad[]> {
		const params = new HttpParams().set('tramoId', tramoId);
		return this.$http.get<IUnidad[]>(`${this.endPoint}/filteredByTramo`, {
			params: params,
		});
	}

	ReasignarUnidadDenominacion(obj: {
		unidadId: number;
		denominacionId: number;
	}): void {
		this.$http
			.post<boolean>(
				`${this.endPoint}/reasignar-unidad-denominacion`,
				obj
			)
			.subscribe((response: boolean) =>
				alert(
					response ? 'Se guardaron los cambios' : 'Ocurrio un error'
				)
			);
	}

	createUnidad(unidad: IUnidad): void {
		this.$http
			.post<boolean>(
				`${this.endPoint}/create-unidad-denominacion`,
				unidad
			)
			.subscribe((response: boolean) => {
				const message = response
					? 'Se han guardado los cambios'
					: 'Algo ha fallado';
				alert(message);
			});
	}
}

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
import { IServerResponse } from '../../generic/Responses/iserver-response';
import { IUnidadEditDto } from '../dto/iunidad-edit-dto';
import { IGenericData } from '../../generic/Responses/igeneric-data';

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

	getUnidadesAutoComplete(param: string, cond: boolean): void {
		const params = new HttpParams()
			.append('param', param)
			.append('esAmbulancia', cond);
		this.$http
			.get<IUnidadAutoComplete[]>(`${this.endPoint}/autocomplete`, {
				params: params,
			})
			.subscribe((data: IUnidadAutoComplete[]) =>
				this.unidadesAutocomplteSource.next(data)
			);
	}

	GetUnidadesPorTramo(tramoId: number): Observable<any[]> {
		const params = new HttpParams().set('tramoId', tramoId);
		return this.$http.get<any[]>(`${this.endPoint}/filteredByTramo`, {
			params: params,
		});
	}

	CreateUnidadToExistingDenomincion(unidad: {
		ficha: string;
		denominacionId: number | null;
	}): void {
		this.$http
			.post<IServerResponse>(
				`${this.endPoint}/create-unidad-denominacion`,
				unidad
			)
			.subscribe((response: IServerResponse) => {
				this.$router.navigateByUrl('unidades/listado');
				alert(response.message);
			});
	}

	CreateUnidadToNewDenomincion(obj: {
		ficha: string;
		tramoId: number;
		tipoUnidadId: number;
		denominacion: number;
	}): void {
		this.$http
			.post<IServerResponse>(
				`${this.endPoint}/create-unidad-new-denominacion`,
				obj
			)
			.subscribe((response: IServerResponse) => {
				this.$router.navigateByUrl('unidades/listado');
				alert(response.message);
			});
	}

	editarUnidad(unidad: IUnidadEditDto): Observable<IServerResponse> {
		return this.$http.post<IServerResponse>(
			`${this.endPoint}/editar-unidad`,
			unidad
		);
	}

	desactivarUnidad(id: number): Observable<IServerResponse> {
		return this.$http.put<IServerResponse>(
			`${this.endPoint}/desactivar-unidad`,
			id
		);
	}

	getDenominacionActual(id: number): Observable<IGenericData> {
		return this.$http.get<IGenericData>(
			`${this.endPoint}/${id}/denominacion-actual`
		);
	}
}

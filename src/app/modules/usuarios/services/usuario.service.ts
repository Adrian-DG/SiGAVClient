import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaginationFilters } from '../../generic/DTO/ipagination-filters';
import { IPagedData } from '../../generic/Responses/ipaged-data';
import { IServerResponse } from '../../generic/Responses/iserver-response';
import { GenericService } from '../../generic/services/generic/generic.service';
import { IUsuario } from '../entities/iusuario';
import { IUsuarioPermisoViewModel } from '../viewModels/iusuario-permiso-view-model';
import { IUsuarioViewModel } from '../viewModels/iusuario-view-model';

@Injectable({
	providedIn: 'root',
})
export class UsuarioService extends GenericService {
	GetResource(): string {
		return 'usuarios';
	}

	constructor(protected override $http: HttpClient) {
		super($http);
	}

	getAllUsuarios(
		filters: IPaginationFilters
	): Observable<IPagedData<IUsuarioViewModel>> {
		return this.$http.get<IPagedData<IUsuarioViewModel>>(
			`${this.endPoint}/all`,
			{ params: this.getPaginationParams(filters) }
		);
	}

	getUsuarioDetalles(id: number): Observable<IUsuarioPermisoViewModel> {
		return this.$http.get<IUsuarioPermisoViewModel>(
			`${this.endPoint}/${id}/details`
		);
	}

	createUsuario(model: IUsuario): void {
		this.$http
			.post<IServerResponse>(`${this.endPoint}/create`, model)
			.subscribe((response: IServerResponse) => alert(response.message));
	}

	UpdateUsuarioEstatus(id: number): void {
		this.$http
			.put<IServerResponse>(`${this.endPoint}/authorize`, id)
			.subscribe((response: IServerResponse) => alert(response.message));
	}
}

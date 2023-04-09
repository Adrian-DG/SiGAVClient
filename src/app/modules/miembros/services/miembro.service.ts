import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaginationFilters } from '../../generic/DTO/ipagination-filters';
import { IPagedData } from '../../generic/Responses/ipaged-data';
import { IServerResponse } from '../../generic/Responses/iserver-response';
import { GenericService } from '../../generic/services/generic/generic.service';
import { ICreateMiembro } from '../DTO/icreate-miembro';
import { IMiembroViewModel } from '../viewModels/imiembro-view-model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class MiembroService extends GenericService {
	GetResource(): string {
		return 'miembros';
	}

	constructor(
		protected override $http: HttpClient,
		private _snackbar: MatSnackBar
	) {
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

	createMiembro(model: ICreateMiembro): void {
		this.$http
			.post<IServerResponse>(`${this.endPoint}/create`, model)
			.subscribe((response: IServerResponse) =>
				this._snackbar.open(response.message)
			);
	}

	UpdateEstatusMiembro(id: number): void {
		this.$http
			.put<IServerResponse>(`${this.endPoint}/authorize`, id)
			.subscribe((response: IServerResponse) =>
				this._snackbar.open(response.message)
			);
	}
}

import { Component, OnInit } from '@angular/core';
import { DenominacionesService } from '../../services/denominaciones.service';
import { IDenominacionesCreate } from '../../interfaces/idenominaciones-create';
import { CacheService } from 'src/app/modules/generic/services/cache/cache.service';
import { FormControl, Validators } from '@angular/forms';
import { IGenericData } from 'src/app/modules/generic/Responses/igeneric-data';
import { IServerResponse } from 'src/app/modules/generic/Responses/iserver-response';
import { IPaginationFilters } from 'src/app/modules/generic/DTO/ipagination-filters';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
	newDenominacion: IDenominacionesCreate = {
		nombre: '',
		tipoUnidadId: 0,
		tramoId: 0,
	};
	tramosControl: FormControl = new FormControl('', [Validators.required]);

	isFormValid: boolean =
		this.newDenominacion.nombre.length > 2 &&
		this.newDenominacion.tramoId > 0 &&
		this.tramosControl.valid;

	constructor(
		private _denominaciones: DenominacionesService,
		public _cache: CacheService
	) {}

	ngOnInit(): void {
		this.tramosControl.valueChanges.subscribe((value: string) => {
			setTimeout(() => this._cache.getTramos(value), 2000);
		});

		this._cache.getData('TipoUnidades');
	}

	displayFn(item: IGenericData): string {
		return item.nombre;
	}

	createDenominacion(): void {
		this.newDenominacion.tramoId = this.tramosControl.value?.id as number;
		this._denominaciones
			.CreateNewDenominacion(this.newDenominacion)
			.subscribe((response: IServerResponse) => {
				alert(response.message);
			});
	}
}

import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { CacheService } from 'src/app/modules/generic/services/cache/cache.service';
import { TramoService } from 'src/app/modules/tramos/services/tramo.service';
import { ITramoViewModel } from 'src/app/modules/tramos/viewModels/itramo-view-model';
import { UnidadesService } from '../../services/unidades.service';
import { IUnidad } from '../../entities/iunidad';
import { IGenericData } from 'src/app/modules/generic/Responses/igeneric-data';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
	fichaControl: FormControl = new FormControl('', [Validators.required]);
	denominacionSelected: FormControl = new FormControl('');

	constructor(
		private _unidad: UnidadesService,
		public _cache: CacheService
	) {}

	ngOnInit(): void {
		this.denominacionSelected.valueChanges.subscribe((value: string) => {
			setTimeout(() => this._cache.getDenominaciones(value), 2000);
		});
	}

	displayFn(item: IGenericData): string {
		return item.nombre;
	}

	createUnidad(): void {
		this._unidad.createUnidad({
			ficha: this.fichaControl.value,
			denominacionId: this.denominacionSelected.value.id,
		});
	}
}

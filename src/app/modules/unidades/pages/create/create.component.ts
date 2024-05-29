import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class CreateComponent implements OnInit, AfterViewInit {
	isDenominacionAlreadyExist: boolean = true;

	fichaControl: FormControl = new FormControl('', [Validators.required]);
	denominacionTextControl: FormControl = new FormControl('');
	tipoUnidadIdControl: FormControl = new FormControl(0);
	tramoIdControl: FormControl = new FormControl(0);

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

	ngAfterViewInit(): void {
		this._cache.getData('Tramos');
		this._cache.getData('TipoUnidades');
	}

	onIsDenominacionAlreadyExist(): void {
		this.isDenominacionAlreadyExist = !this.isDenominacionAlreadyExist;
	}

	displayFn(item: IGenericData): string {
		return item.nombre;
	}

	createUnidad(): void {
		this.isDenominacionAlreadyExist
			? this._unidad.CreateUnidadToExistingDenomincion({
					ficha: this.fichaControl.value,
					denominacionId: this.denominacionSelected.value.id,
			  })
			: this._unidad.CreateUnidadToNewDenomincion({
					ficha: this.fichaControl.value,
					tramoId: this.tramoIdControl.value,
					tipoUnidadId: this.tipoUnidadIdControl.value,
					denominacion: this.denominacionTextControl.value,
			  });
	}
}

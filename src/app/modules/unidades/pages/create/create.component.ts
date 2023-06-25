import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CacheService } from 'src/app/modules/generic/services/cache/cache.service';
import { TramoService } from 'src/app/modules/tramos/services/tramo.service';
import { ITramoViewModel } from 'src/app/modules/tramos/viewModels/itramo-view-model';
import { UnidadesService } from '../../services/unidades.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
	tramosFilteredList!: ITramoViewModel[];

	constructor(
		private $fb: FormBuilder,
		private _unidad: UnidadesService,
		public _tramos: TramoService,
		public _cache: CacheService
	) {}

	unidadForm: FormGroup = this.$fb.group({
		denominacion: ['', [Validators.required]],
		ficha: ['', [Validators.required]],
		placa: [
			'',
			[
				Validators.required,
				Validators.minLength(7),
				Validators.maxLength(10),
				Validators.pattern(/^[A-Za-z0-9]{1,10}$/),
			],
		],
		puntosAsignados: [''],
		cobertura: [''],
		tipoUnidadId: [0],
		tramoId: [0],
	});

	get placa() {
		return this.unidadForm.get('placa');
	}

	ngOnInit(): void {
		this._tramos
			.getFilteredTramosByNombre()
			.subscribe(
				(data: ITramoViewModel[]) => (this.tramosFilteredList = data)
			);
	}

	createUnidad(): void {
		this._unidad.PostConfirm(this.unidadForm.value);
	}
}

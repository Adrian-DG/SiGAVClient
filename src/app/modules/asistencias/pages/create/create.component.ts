import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { CacheService } from 'src/app/modules/generic/services/cache/cache.service';
import { UnidadesService } from 'src/app/modules/unidades/services/unidades.service';
import { AsistenciasService } from '../../services/asistencias.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
	constructor(
		private $fb: FormBuilder,
		private _asistencias: AsistenciasService,
		public _cache: CacheService,
		public _unidades: UnidadesService
	) {}

	ciudadanoForm: FormGroup = new FormGroup({
		identificacion: new FormControl('', [Validators.required]),
		nombre: new FormControl(''),
		apellido: new FormControl(''),
		genero: new FormControl(),
		telefono: new FormControl(''),
		esExtranjero: new FormControl(false),
	});

	vehiculoForm: FormGroup = new FormGroup({
		vehiculoTipoId: new FormControl(0),
		vehiculoColorId: new FormControl(0),
		vehiculoModeloId: new FormControl(0),
		vehiculoMarcaId: new FormControl(0),
		placa: new FormControl(''),
	});

	asistenciaForm: FormGroup = new FormGroup({
		municipioId: new FormControl(0),
		provinciaId: new FormControl(0),
		unidadId: new FormControl(0),
		tipoAsistenciaId: new FormControl(0),
		reportadoPor: new FormControl(1),
		comentarios: new FormControl(''),
	});

	// asistenciaForm: FormGroup = this.$fb.group({
	// 	identificacion: ['', [Validators.required, Validators.minLength(11)]],
	// 	nombreCiudadano: [''],
	// 	telefono: [''],
	// 	vehiculoTipoId: [0],
	// 	vehiculoColorId: [0],
	// 	vehiculoModeloId: [0],
	// 	vehiculoMarcaId: [0],
	// 	placa: [''],
	// 	municipioId: [0],
	// 	provinciaId: [0],
	// 	unidadId: [0],
	// 	tipoAsistenciaId: [0],
	// 	reportadoPor: [1],
	// 	comentarios: [''],
	// });

	ngOnInit(): void {
		this._unidades.getUnidadesAutoComplete('');
	}

	createAsistencia(): void {
		this._asistencias.createAsistencia(this.asistenciaForm.value);
	}
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

	asistenciaForm: FormGroup = this.$fb.group({
		identificacion: ['', [Validators.required, Validators.minLength(11)]],
		nombreCiudadano: [''],
		edad: [0],
		telefono: [''],
		vehiculoTipoId: [0],
		vehiculoColorId: [0],
		vehiculoModeloId: [0],
		vehiculoMarcaId: [0],
		latitud: [''],
		longitud: [''],
		municipioId: [0],
		provinciaId: [0],
		unidadId: [0],
		tipoAsistenciaId: [0],
		reportadoPor: [1],
	});

	ngOnInit(): void {
		this._unidades.getUnidadesAutoComplete('');
	}

	createAsistencia(): void {
		this._asistencias.createAsistencia(this.asistenciaForm.value);
	}
}

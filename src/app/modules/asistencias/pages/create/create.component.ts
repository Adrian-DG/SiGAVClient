import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { CacheService } from 'src/app/modules/generic/services/cache/cache.service';
import { UnidadesService } from 'src/app/modules/unidades/services/unidades.service';
import { IAsistenciaR5Create } from '../../DTO/iasistencia-r5-create';
import { AsistenciasService } from '../../services/asistencias.service';
import { IUnidadAutoComplete } from 'src/app/modules/unidades/viewModels/iunidad-auto-complete';
import { Observable } from 'rxjs';

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

	hasPersonInformation: boolean = true;

	// setPersonInformationPermission(): void {
	// 	console.log('Permission: ', this.hasPersonInformation);
	// 	if (!this.hasPersonInformation) {
	// 		// ciudadano
	// 		this.ciudadanoForm!.clearValidators();
	// 		this.ciudadanoForm!.updateValueAndValidity();
	// 		// vehiculo
	// 		this.vehiculoForm!.clearValidators();
	// 		this.vehiculoForm!.updateValueAndValidity();
	// 	} else {
	// 		this.initFormulary();
	// 	}
	// }

	// customizedValidator = {
	// 	identification: [
	// 		Validators.required,
	// 		Validators.pattern(/^[0-9]{11,15}$/),
	// 	],
	// 	fullname: [
	// 		Validators.required,
	// 		Validators.pattern(/^[A-Za-z0-9ñÑ ]{1,30}$/),
	// 	],
	// 	phonenumber: [
	// 		Validators.required,
	// 		Validators.pattern(/^[0-9]{10,15}$/),
	// 	],
	// 	placa: [
	// 		Validators.required,
	// 		Validators.pattern(/^[A-Za-z][A-Za-z0-9]{0,11}$/),
	// 	],
	// };

	ciudadanoForm: FormGroup | undefined;
	vehiculoForm: FormGroup | undefined;
	ubicacionForm!: FormGroup;
	asistenciaForm: FormGroup | undefined;

	initFormulary(): void {
		this.ciudadanoForm = new FormGroup({
			identificacion: new FormControl(''),
			nombre: new FormControl(''),
			apellido: new FormControl(''),
			genero: new FormControl(),
			telefono: new FormControl(''),
			esExtranjero: new FormControl(false),
		});

		this.vehiculoForm = new FormGroup({
			vehiculoTipoId: new FormControl(0),
			vehiculoColorId: new FormControl(0),
			vehiculoModeloId: new FormControl(0),
			vehiculoMarcaId: new FormControl(0),
			placa: new FormControl(''),
		});

		this.ubicacionForm = new FormGroup({
			provinciaId: new FormControl(0),
			municipioId: new FormControl(0),
			direccion: new FormControl(''),
		});

		this.asistenciaForm = new FormGroup({
			tipoAsistenciaId: new FormControl(0),
			comentarios: new FormControl(''),
		});
	}

	unidadAsignadaId: FormControl = new FormControl('');

	ngOnInit(): void {
		this.initFormulary();
		this.unidadAsignadaId.valueChanges.subscribe((value: string) => {
			if (value.length > 2) {
				this._unidades.getUnidadesAutoComplete(value);
			}
		});
	}

	displayFn(item: IUnidadAutoComplete): string {
		return item && item.ficha && item.denominacion
			? `${item.ficha} | ${item.denominacion}`
			: '';
	}

	createAsistencia(): void {
		const {
			identificacion,
			nombre,
			apellido,
			genero,
			telefono,
			esExtranjero,
		} = this.ciudadanoForm!.value;

		const {
			vehiculoTipoId,
			vehiculoColorId,
			vehiculoModeloId,
			vehiculoMarcaId,
			placa,
		} = this.vehiculoForm!.value;

		const { provinciaId, municipioId, direccion } =
			this.ubicacionForm?.value;

		const { tipoAsistenciaId, comentarios } = this.asistenciaForm!.value;

		const unidadSelected: IUnidadAutoComplete = this.unidadAsignadaId.value;

		const newAsistencia: IAsistenciaR5Create = {
			// ciudadano
			identificacion: identificacion,
			nombre: nombre,
			apellido: apellido,
			genero: parseInt(genero),
			esExtranjero: esExtranjero,
			telefono: telefono,
			// vehiculo
			vehiculoColorId: vehiculoColorId,
			vehiculoTipoId: vehiculoTipoId,
			vehiculoMarcaId: vehiculoMarcaId,
			vehiculoModeloId: vehiculoModeloId,
			placa: placa,
			// asistencia
			municipioId: municipioId,
			provinciaId: provinciaId,
			direccion: direccion,
			unidadId: unidadSelected.unidadId,
			tipoAsistencias: tipoAsistenciaId,
			comentario: comentarios,
			usuarioId: this._asistencias.userId,
		};

		console.log(newAsistencia);

		this._asistencias.createAsistencia(newAsistencia);
	}
}

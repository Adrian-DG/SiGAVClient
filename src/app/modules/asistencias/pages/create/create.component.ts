import { Component, OnInit, AfterViewInit } from '@angular/core';
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

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, AfterViewInit {
	constructor(
		private $fb: FormBuilder,
		private _asistencias: AsistenciasService,
		public _cache: CacheService,
		public _unidades: UnidadesService
	) {}

	hasPersonInformation: boolean = true;

	setPersonInformationPermission(): void {
		console.log('Permission: ', this.hasPersonInformation);
		if (!this.hasPersonInformation) {
			// ciudadano
			this.ciudadanoForm!.clearValidators();
			this.ciudadanoForm!.updateValueAndValidity();
			// vehiculo
			this.vehiculoForm!.clearValidators();
			this.vehiculoForm!.updateValueAndValidity();
		} else {
			this.initFormulary();
		}
	}

	customizedValidator = {
		identification: [
			Validators.required,
			Validators.pattern(/^[0-9]{11,15}$/),
		],
		fullname: [
			Validators.required,
			Validators.pattern(/^[A-Za-z0-9ñÑ ]{1,30}$/),
		],
		phonenumber: [
			Validators.required,
			Validators.pattern(/^[0-9]{10,15}$/),
		],
		placa: [
			Validators.required,
			Validators.pattern(/^[A-Za-z][A-Za-z0-9]{0,11}$/),
		],
	};

	ciudadanoForm: FormGroup | undefined;
	vehiculoForm: FormGroup | undefined;
	asistenciaForm: FormGroup | undefined;

	initFormulary(): void {
		this.ciudadanoForm = new FormGroup({
			identificacion: new FormControl(
				'',
				this.customizedValidator.identification
			),
			nombre: new FormControl('', this.customizedValidator.fullname),
			apellido: new FormControl('', this.customizedValidator.fullname),
			genero: new FormControl(),
			telefono: new FormControl('', this.customizedValidator.phonenumber),
			esExtranjero: new FormControl(false),
		});

		this.vehiculoForm = new FormGroup({
			vehiculoTipoId: new FormControl(0),
			vehiculoColorId: new FormControl(0),
			vehiculoModeloId: new FormControl(0),
			vehiculoMarcaId: new FormControl(0),
			placa: new FormControl('', this.customizedValidator.placa),
		});

		this.asistenciaForm = new FormGroup({
			municipioId: new FormControl(0),
			provinciaId: new FormControl(0),
			unidadId: new FormControl(0),
			tipoAsistenciaId: new FormControl(0),
			comentarios: new FormControl(''),
		});
	}

	ngOnInit(): void {
		this.initFormulary();
	}

	ngAfterViewInit(): void {
		this._unidades.getUnidadesAutoComplete('');
	}

	displayFn(unidad: IUnidadAutoComplete): string {
		return unidad.ficha && unidad.denominacion
			? `${unidad.ficha} - ${unidad.denominacion}`
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

		const {
			municipioId,
			provinciaId,
			unidadId,
			tipoAsistenciaId,
			comentarios,
		} = this.asistenciaForm!.value;

		const unidadSelected: IUnidadAutoComplete = unidadId;

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
			unidadId: unidadSelected.unidadId,
			tipoAsistencias: tipoAsistenciaId,
			comentario: comentarios,
			usuarioId: this._asistencias.userId,
		};

		this._asistencias.createAsistencia(newAsistencia);
	}
}

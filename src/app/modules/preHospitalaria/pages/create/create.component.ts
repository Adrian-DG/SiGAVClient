import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AsistenciPreHospitalariaService } from '../../services/asistenci-pre-hospitalaria.service';
import { IAsistenciaCreatePreHospitalariaDto } from '../../interfaces/iasistencia-create-pre-hospitalaria.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CacheService } from 'src/app/modules/generic/services/cache/cache.service';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { IGenericData } from 'src/app/modules/generic/Responses/igeneric-data';
import { UnidadesService } from 'src/app/modules/unidades/services/unidades.service';
import { IUnidadAutoComplete } from 'src/app/modules/unidades/viewModels/iunidad-auto-complete';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, AfterViewInit {
	hasPersonInformation = true;
	esTraslado = false;
	esEventoEspecial = false;
	zonaSelected = 0;
	tipoAsistenciaSelected: number = 0;

	// Informacion general

	generalForm: FormGroup = new FormGroup({
		despachadaPor: new FormControl(0, [Validators.required]), // Enum
		apoyoBrindado: new FormControl(0, [Validators.required]),
	});

	ubicacionUnidadForm: FormGroup = new FormGroup({
		zona: new FormControl(0, [Validators.required]),
		esEventoCampo: new FormControl(false),
		provinciaId: new FormControl(0),
		municipioId: new FormControl(0),
		unidadId: new FormControl(0),
	});

	cronogramaForm: FormGroup = new FormGroup({});

	detalleForm: FormGroup = new FormGroup({
		esEventoCampo: new FormControl(false),
		esEventoEspecial: new FormControl(false),
		detalleAsistencia: new FormControl(''),
		tipoAsistencia: new FormControl(0), // Enum
		nombreEventoEspecial: new FormControl(''),
	});

	datosPacienteForm: FormGroup = new FormGroup({
		esDesconocida: new FormControl(false),
		identificacion: new FormControl('', [
			Validators.required,
			Validators.minLength(11),
		]),
		nombre: new FormControl(''),
		apellido: new FormControl(''),
		sexo: new FormControl(0),
		edad: new FormControl(0),
		telefono: new FormControl('', [
			Validators.required,
			Validators.minLength(10),
		]),
		nacionalidadId: new FormControl(0),
	});

	datosTrasladoForm: FormGroup = new FormGroup({
		esTraslado: new FormControl(false),
		causaTraslado: new FormControl(0), // enum
	});

	datosCentroSaludForm: FormGroup = new FormGroup({
		hospitalId: new FormControl(0),
		personaRecibioEnHospital: new FormControl(''),
	});

	datosAntecedentesForm: FormGroup = new FormGroup({
		tieneAntecedentesMorbidos: new FormControl(false),
		antecedetesMorbidos: new FormControl(''),
	});

	signosVitalesForm: FormGroup = new FormGroup({
		frecuenciaCardiaca: new FormControl(0),
		frecuenciaRespiratoria: new FormControl(0),
		tensionArterialSistolica: new FormControl(0),
		tensionArterialDiastolica: new FormControl(0),
		saturacionParcialOxigeno: new FormControl(0),
		temperatura: new FormControl(0),
	});

	respuestaForm: FormGroup = new FormGroup({
		llenadoCapilar: new FormControl(0),
		aperturaOcular: new FormControl(0),
		respuestaVerbal: new FormControl(0),
		respuestaMotora: new FormControl(0),
	});

	examenFisicoForm: FormGroup = new FormGroup({
		hallazgosPositivos: new FormControl(''),
	});

	diagnosticoPresuntivoForm: FormGroup = new FormGroup({
		diagnosticosPresuntivos: new FormControl(''),
		procedimientosRealizados: new FormControl(''),
	});

	insumosUtilizadosForm: FormGroup = new FormGroup({
		insumos: new FormControl(''),
	});

	personalAsisteForm: FormGroup = new FormGroup({
		medicoId: new FormControl(0),
		componente1Id: new FormControl(0),
		componente2Id: new FormControl(0),
		reguladorId: new FormControl(0),
	});

	hospitalControl: FormControl = new FormControl('');
	medicoControl: FormControl = new FormControl('');
	unidadControl: FormControl = new FormControl('');

	tiposDespacho = [
		{ id: 1, nombre: 'SISTEMA NACIONAL DE EMERGENCIAS' },
		{ id: 2, nombre: 'MOPC' },
	];

	tiposApoyo = [
		{ id: 1, nombre: 'NINGUNA' },
		{ id: 2, nombre: 'UNIDAD DE AMBULANCIA MOPC' },
		{ id: 3, nombre: 'UNIDAD DE RESCATE MOPC' },
	];

	listadoZonas = [
		{ id: 1, nombre: 'NORTE' },
		{ id: 3, nombre: 'SUR' },
		{ id: 2, nombre: 'ESTE' },
	];

	tiposAsistencias = [
		{ id: 1, nombre: 'ASISTENCIA MÉDICA' },
		{ id: 2, nombre: 'MOVIMIENTO' },
		{ id: 3, nombre: 'EVENTO ESPECIAL' },
	];

	constructor(
		private service: AsistenciPreHospitalariaService,
		public _cache: CacheService,
		private _auth: AuthService,
		public _unidades: UnidadesService
	) {}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this._cache.getData('nacionalidades');
		this._cache.getFilterMiembrosPreHospitalaria();
	}

	onZonaSelectionChange(): void {
		const { zona } = this.ubicacionUnidadForm.value;
		this.zonaSelected = parseInt(zona);
		this._cache.getDataOnId('filter_provicias', parseInt(zona));
		this._cache.getFilterUnidadesPreHospitalariaByRegion(parseInt(zona));
		this._cache.GetHospitalesPorRegion(parseInt(zona));
	}

	onProvinciaSelectionChange(): void {
		const { provinciaId } = this.ubicacionUnidadForm.value;
		this._cache.getDataOnId('municipios', provinciaId);
	}

	onTipoAsistenciaSelectionChange(): void {
		const { tipoAsistencia } = this.detalleForm.value;
		this.tipoAsistenciaSelected = tipoAsistencia;
	}

	onEventoEspecialChange(): void {
		this.esEventoEspecial = !this.esEventoEspecial;
		this.detalleForm.controls['tipoAsistencia'].setValue(
			this.esEventoEspecial ? 3 : 0
		);
	}

	create(): void {
		if (
			confirm(
				'Se creara la asistecia y guardaran los cambios, esta seguro de seguir adelante ?'
			)
		) {
			const asistencia: IAsistenciaCreatePreHospitalariaDto = {
				...this.generalForm.value,
				...this.ubicacionUnidadForm.value,
				...this.detalleForm.value,
				...this.datosPacienteForm.value,
				...this.datosTrasladoForm.value,
				...this.datosCentroSaludForm.value,
				...this.datosAntecedentesForm.value,
				...this.signosVitalesForm.value,
				...this.respuestaForm.value,
				...this.examenFisicoForm.value,
				...this.diagnosticoPresuntivoForm.value,
				...this.insumosUtilizadosForm.value,
				...this.personalAsisteForm.value,
			};

			console.log(asistencia);

			this.service.createAsisteciaPreHospitalaria(asistencia);
		}
	}
}

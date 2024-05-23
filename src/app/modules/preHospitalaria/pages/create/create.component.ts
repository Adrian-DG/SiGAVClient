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
	hasPersonInformation = false;
	esTraslado = false;
	esEventoEspecial = false;

	// Informacion general

	generalForm: FormGroup = new FormGroup({
		despachadaPor: new FormControl(0, [Validators.required]), // Enum
		apoyoBrindado: new FormControl(0, [Validators.required]),
	});

	ubicacionUnidadForm: FormGroup = new FormGroup({
		zona: new FormControl(0, [Validators.required]),
		provinciaId: new FormControl(0, [Validators.required]),
		municipioId: new FormControl(0, [Validators.required]),
		unidadId: new FormControl(0, [Validators.required]),
	});

	cronogramaForm: FormGroup = new FormGroup({
		horaLlamadaRecibida: new FormControl('', [Validators.required]),
		horaLlegadaAlEvento: new FormControl('', [Validators.required]),
		horaAbordajePaciente: new FormControl(''),
		horaSalidaHospital: new FormControl(''),
		horaEntregaPaciente: new FormControl(''),
		horaUnidadDisponible: new FormControl('', [Validators.required]),
	});

	detalleForm: FormGroup = new FormGroup({
		detalle: new FormControl('', [Validators.required]),
		tipoAsistencia: new FormControl(0, [Validators.required]), // Enum
		nombreEvento: new FormControl(''),
	});

	datosPacienteForm: FormGroup = new FormGroup({
		esDesconocida: new FormControl(false),
		identificacion: new FormControl('', [
			Validators.required,
			Validators.minLength(11),
		]),
		nombre: new FormControl('', [Validators.required]),
		apellido: new FormControl('', [Validators.required]),
		sexo: new FormControl(0, [Validators.required]),
		edad: new FormControl(0, [Validators.required]),
		telefono: new FormControl('', [
			Validators.required,
			Validators.minLength(10),
		]),
		nacionalidadId: new FormControl(0, [Validators.required]),
	});

	datosTrasladoForm: FormGroup = new FormGroup({
		esTraslado: new FormControl(false),
		causaTraslado: new FormControl(0), // enum
	});

	datosCentroSaludForm: FormGroup = new FormGroup({
		zona: new FormControl(0, [Validators.required]),
		hospitalId: new FormControl(0, [Validators.required]),
		personaRecibio: new FormControl('', [Validators.required]),
	});

	datosAntecedentesForm: FormGroup = new FormGroup({
		tieneAntecedentesMorbidos: new FormControl(false),
		antecedetesMorbidos: new FormControl(''),
	});

	signosVitalesForm: FormGroup = new FormGroup({
		antecedentesMorbidos: new FormControl(''),
		detalleAsistencia: new FormControl(''),
		frecuenciaCardiaca: new FormControl(0),
		frecuenciaRespiratoria: new FormControl(0),
		tensionArterialSistolica: new FormControl(0),
		tensionArterialDiastolica: new FormControl(0),
		saturacionParcialOxigeno: new FormControl(0),
		temperatura: new FormControl(0),
		llenadoCapilar: new FormControl(0),
		aperturaOcular: new FormControl(0),
		respuestaVerbal: new FormControl(0),
		respuestaMotora: new FormControl(0),
	});

	examenFisicoForm: FormGroup = new FormGroup({
		hallazgosPositivos: new FormControl('', [Validators.required]),
	});

	diagnosticoPresuntivoForm: FormGroup = new FormGroup({
		diagnosticosPresuntivos: new FormControl('', [Validators.required]),
		procedimientosRealizados: new FormControl('', [Validators.required]),
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

	constructor(
		private service: AsistenciPreHospitalariaService,
		public _cache: CacheService,
		private _auth: AuthService,
		public _unidades: UnidadesService
	) {}

	ngOnInit(): void {
		this.medicoControl.valueChanges.subscribe((value: string) => {
			if (value.length > 2) {
				setTimeout(
					() => this._cache.getFilterMiembrosPreHospitalaria(value),
					2000
				);
			}
		});

		this.unidadControl.valueChanges.subscribe((value: string) => {
			if (value.length > 2) {
				setTimeout(
					() => this._unidades.getUnidadesAutoComplete(value, true),
					2000
				);
			}
		});

		this.hospitalControl.valueChanges.subscribe((value: string) => {
			if (value.length > 2) {
				setTimeout(() => this._cache.getFilterHospitales(value), 2000);
			}
		});
	}

	ngAfterViewInit(): void {
		this._cache.getData('nacionalidades');
	}

	displayFn(item: IGenericData): string {
		return item.nombre;
	}

	displayFn2(item: IUnidadAutoComplete): string {
		return item.denominacion == undefined || item.ficha == undefined
			? ''
			: `${item.ficha} | ${item.denominacion}`;
	}

	onCheckboxTrasladoChange(event: any): void {
		this.esTraslado = event;
	}

	onChecboxEventoEspecial(event: any): void {
		this.esEventoEspecial = event;
	}

	onZonaSelectionChange(): void {
		const { zona } = this.ubicacionUnidadForm.value;
		this._cache.getDataOnId('filter_provicias', zona);
		// this._cache.getDataOnId('hospitales', zona);
	}

	onProvinciaSelectionChange(id: number): void {
		this._cache.getDataOnId('municipios', id);
	}

	create(): void {}
}

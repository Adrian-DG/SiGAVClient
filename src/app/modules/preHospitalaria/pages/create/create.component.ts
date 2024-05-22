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

	ciudadanoForm: FormGroup = new FormGroup({
		personaDesconocida: new FormControl(this.hasPersonInformation),
		identificacion: new FormControl(''),
		nombre: new FormControl(''),
		apellido: new FormControl(''),
		sexo: new FormControl(0),
		edad: new FormControl(0),
		telefono: new FormControl(''),
		nacionalidadId: new FormControl(''),
	});

	asistenciaForm: FormGroup = new FormGroup({
		tipoAsistencia: new FormControl(0),
		tipoCausa: new FormControl(0),
		esTraslado: new FormControl(false),
		causaTraslado: new FormControl(0),
		despachadaPor: new FormControl(0),
		apoyoBrindado: new FormControl(0),
		esEventoCampo: new FormControl(false),
		esEventoEspecial: new FormControl(false),
		nombreEventoEspecial: new FormControl(''),
	});

	ubicacionForm: FormGroup = new FormGroup({
		zona: new FormControl(0, [Validators.required]),
		provinciaId: new FormControl(0),
		municipioId: new FormControl(0),
		personaRecibioEnHospital: new FormControl(''),
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

	hospitalControl: FormControl = new FormControl('');
	medicoControl: FormControl = new FormControl('');
	unidadControl: FormControl = new FormControl('');

	detallesForm: FormGroup = new FormGroup({
		hallazgoPositivo: new FormControl(''),
		diagnosticoPresuntivo: new FormControl(''),
		procedimientosRealizados: new FormControl(''),
		insumosUtilizados: new FormControl(''),
	});

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
		const { zona } = this.ubicacionForm.value;
		this._cache.getDataOnId('filter_provicias', zona);
		// this._cache.getDataOnId('hospitales', zona);
	}

	onProvinciaSelectionChange(id: number): void {
		this._cache.getDataOnId('municipios', id);
	}

	create(): void {
		const ciudadanoFormData = this.ciudadanoForm.value;
		const asistenciaFormData = this.asistenciaForm.value;
		const ubicacionFormData = this.ubicacionForm.value;
		const signosVitalesFormData = this.signosVitalesForm.value;
		const detallesFormData = this.detallesForm.value;

		const newAsistencia: IAsistenciaCreatePreHospitalariaDto = {
			...ciudadanoFormData,
			...asistenciaFormData,
			...ubicacionFormData,
			...signosVitalesFormData,
			...detallesFormData,
			hospitalId: this.hospitalControl.value.id,
			medicoId: this.medicoControl.value.id,
			denominacionId: 0,
			unidadId: this.unidadControl.value.unidadId,
			reguladorEmergenciaId: 0,
		};

		this.service.createAsisteciaPreHospitalaria(newAsistencia);
	}
}

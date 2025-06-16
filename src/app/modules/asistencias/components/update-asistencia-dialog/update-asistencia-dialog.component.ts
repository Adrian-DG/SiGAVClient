import {
	Component,
	Inject,
	OnInit,
	AfterViewInit,
	LOCALE_ID,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AsistenciasService } from '../../services/asistencias.service';
import { IAsistencia } from '../../entities/iasistencia';
import { CacheService } from 'src/app/modules/generic/services/cache/cache.service';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { IAsistenciaEdit } from '../../DTO/iasistencia-edit';
import { IGenericData } from 'src/app/modules/generic/Responses/igeneric-data';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-update-asistencia-dialog',
	templateUrl: './update-asistencia-dialog.component.html',
	styleUrls: ['./update-asistencia-dialog.component.scss'],
	providers: [DatePipe, { provide: LOCALE_ID, useValue: 'es-ES' }],
})
export class UpdateAsistenciaDialogComponent implements OnInit, AfterViewInit {
	entitySource: BehaviorSubject<IAsistenciaEdit | null> =
		new BehaviorSubject<IAsistenciaEdit | null>(null);
	entity$: Observable<IAsistenciaEdit | null> =
		this.entitySource.asObservable();

	categoriaAsistencia!: number;
	unidadSelected: FormControl = new FormControl('');
	miembroSelected: FormControl = new FormControl('');
	isKeepingUnidad: boolean = true;
	isKeepingMiembro: boolean = true;

	fechaCreacionModel: Date | null = null;
	horaCreacionModel: Date | null = null;
	fechaLlegadaModel: Date | null = null;
	horaLlegadaModel: Date | null = null;
	fechaCompletadaModel: Date | null = null;
	horaCompletadaModel: Date | null = null;

	get fechaCreacionString(): string {
		return (
			this.datePipe.transform(this.params.fechaCreacion, 'dd/MM/yyyy') ||
			''
		);
	}

	get horaCreacionString(): string {
		return (
			this.datePipe.transform(this.params.fechaCreacion, 'HH:mm a') || ''
		);
	}

	get fechaLlegadaString(): string {
		return (
			this.datePipe.transform(this.params.tiempoLlegada, 'dd/MM/yyyy') ||
			''
		);
	}

	get horaLlegadaString(): string {
		return (
			this.datePipe.transform(this.params.tiempoLlegada, 'HH:mm a') || ''
		);
	}

	get fechaCompletadaString(): string {
		return (
			this.datePipe.transform(
				this.params.tiempoCompletada,
				'dd/MM/yyyy'
			) || ''
		);
	}

	get horaCompletadaString(): string {
		return (
			this.datePipe.transform(this.params.tiempoCompletada, 'HH:mm a') ||
			'No Completada'
		);
	}

	constructor(
		private _asistencias: AsistenciasService,
		public dialogRef: MatDialogRef<UpdateAsistenciaDialogComponent>,
		@Inject(MAT_DIALOG_DATA)
		public params: {
			id: number;
			types: string[];
			categoria: string;
			denominacion: string;
			miembro: string;
			fechaCreacion: Date;
			tiempoLlegada: Date | null;
			tiempoCompletada: Date | null;
		},
		public _cache: CacheService,
		@Inject(DatePipe) private datePipe: DatePipe
	) {
		this.unidadSelected.valueChanges.subscribe((value: string) => {
			setTimeout(() => this._cache.getDenominaciones(value), 1000);
		});
		this.miembroSelected.valueChanges.subscribe((value: string) => {
			setTimeout(() => this._cache.getFilterMiembros(value), 1000);
		});
	}

	ngOnInit(): void {
		this.categoriaAsistencia =
			this.params.categoria == 'Emergencia' ? 1 : 2;
		this._cache.getDataOnId('TipoAsistencia', this.categoriaAsistencia);
	}

	ngAfterViewInit(): void {
		this._asistencias
			.GetAsistenciaEditViewModel(this.params.id)
			.subscribe((data: IAsistenciaEdit) => {
				const resources = [
					'VehiculoTipo',
					'VehiculoColores',
					'VehiculoMarca',
					'VehiculoModelo',
					'provincias',
					'municipios',
				];

				resources.forEach((item: string) => {
					if (item === 'municipios' || item === 'TipoAsistencia') {
						this._cache.getDataOnId(item, data.provinciaId);
					} else if (item === 'VehiculoModelo') {
						this._cache.getDataOnIdFilters(
							item,
							data.vehiculoTipoId,
							data.vehiculoMarcaId
						);
					} else {
						this._cache.getData(item);
					}
				});

				this.entitySource.next(data);
			});
	}

	displayFn(item: IGenericData): string {
		return item.nombre;
	}

	formatTime(timeModel: Date | string | null): string | null {
		let hora: string | null = null;

		if (typeof timeModel === 'string') {
			// Parse "HH:mm" string into a Date object for DatePipe
			const [hours, minutes] = timeModel.split(':').map(Number);
			const tempDate = new Date();
			tempDate.setHours(hours, minutes, 0, 0);
			hora = this.datePipe.transform(tempDate, 'HH:mm');
		} else {
			hora = this.datePipe.transform(timeModel, 'HH:mm');
		}

		console.log(`Formatting time: ${timeModel} to ${hora}`);
		return hora;
	}

	formatNewDate(
		dateModel: Date | string | null,
		timeModel: Date | string | null
	): string | null {
		console.log(`Formatting date: ${dateModel}, time: ${timeModel}`);
		if (!dateModel || !timeModel) return null;
		const fecha = this.datePipe.transform(dateModel, 'yyyy-MM-dd');
		const hora: string | null = this.formatTime(timeModel);
		if (!fecha || !hora) return null;
		return `${fecha} ${hora}`;
	}

	async saveChanges(): Promise<void> {
		const entity: IAsistenciaEdit | null = await firstValueFrom(
			this.entity$
		);

		if (entity) {
			let miembro = this.isKeepingMiembro
				? entity.miembroId
				: this.miembroSelected.value.id;
			let denominacion = this.isKeepingUnidad
				? entity.denominacionId
				: this.unidadSelected.value.id;
			console.log(
				`IsKeepingMiembro: ${this.isKeepingMiembro} Miembro: ${miembro}`
			);
			console.log(
				`IsKeepingUnidad: ${this.isKeepingUnidad} Denominacion: ${denominacion}`
			);

			this._asistencias
				.CompletarInformacionAsistencia({
					id: entity.id as number,
					identificacion: entity.identificacion,
					nombre: entity.nombre,
					apellido: entity.apellido,
					telefono: entity.telefono,
					genero: entity.genero,
					esExtranjero: entity.esExtranjero,
					placa: entity.placa,
					vehiculoTipoId: entity.vehiculoTipoId,
					vehiculoMarcaId: entity.vehiculoMarcaId,
					vehiculoColorId: entity.vehiculoColorId,
					vehiculoModeloId: entity.vehiculoModeloId,
					provinciaId: entity.provinciaId,
					comentario: entity.comentario,
					direccion: '',
					municipioId: entity.municipioId,
					tipoAsistencias: entity.tipoAsistencias,
					miembroId: miembro,
					denominacionId: denominacion,

					fechaCreacion: this.formatNewDate(
						this.fechaCreacionModel,
						this.horaCreacionModel
					),
					tiempoLlegada: this.formatNewDate(
						this.fechaLlegadaModel,
						this.horaLlegadaModel
					),
					tiempoCompletada: this.formatNewDate(
						this.fechaCompletadaModel,
						this.horaCompletadaModel
					),
				})
				.subscribe((response: boolean) => {
					if (response) {
						this.dialogRef.close(true);
					} else {
						alert('Error al actualizar la asistencia.');
					}
				});
		}
	}

	changeUnidad(): void {
		this.isKeepingUnidad = !this.isKeepingUnidad;
	}

	changeMiembro(): void {
		this.isKeepingMiembro = !this.isKeepingMiembro;
	}
}

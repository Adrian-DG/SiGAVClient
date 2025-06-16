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
	iskeepingUnidad: boolean = true;
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
			''
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

	formatNewDate(dateModel: Date | null, timeModel: Date | null): Date | null {
		if (dateModel && timeModel) {
			const year = dateModel.getFullYear();
			const month = dateModel.getMonth();
			const day = dateModel.getDate();
			const hours = timeModel.getHours();
			const minutes = timeModel.getMinutes();
			return new Date(year, month, day, hours, minutes);
		}
		return null;
	}

	async saveChanges(): Promise<void> {
		const entity: IAsistenciaEdit | null = await firstValueFrom(
			this.entity$
		);

		if (entity) {
			let miembro = this.isKeepingMiembro
				? entity.miembroId
				: this.miembroSelected.value.id;
			let denominacion = this.iskeepingUnidad
				? entity.denominacionId
				: this.unidadSelected.value.id;
			console.log(
				`IsKeepingMiembro: ${this.isKeepingMiembro} Miembro: ${miembro}`
			);
			console.log(
				`IsKeepingUnidad: ${this.iskeepingUnidad} Denominacion: ${denominacion}`
			);

			const newFechaCreacion = this.formatNewDate(
				this.fechaCreacionModel,
				this.horaCreacionModel
			);
			const newFechaLlegada = this.formatNewDate(
				this.fechaLlegadaModel,
				this.horaLlegadaModel
			);
			const newFechaCompletada = this.formatNewDate(
				this.fechaCompletadaModel,
				this.horaCompletadaModel
			);

			this._asistencias.CompletarInformacionAsistencia({
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

				fechaCreacion: newFechaCreacion ?? entity.fechaCreacion,
				tiempoLlegada: newFechaLlegada ?? entity.tiempoLlegada,
				tiempoCompletada: newFechaCompletada ?? entity.tiempoCompletada,
			});
		}
		//if (entity) this._asistencias.Update<IAsistencia>(entity);
	}

	changeUnidad(): void {
		this.iskeepingUnidad = !this.iskeepingUnidad;
	}

	changeMiembro(): void {
		this.isKeepingMiembro = !this.isKeepingMiembro;
	}
}

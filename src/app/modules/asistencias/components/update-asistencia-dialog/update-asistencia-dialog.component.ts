import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AsistenciasService } from '../../services/asistencias.service';
import { IAsistencia } from '../../entities/iasistencia';
import { CacheService } from 'src/app/modules/generic/services/cache/cache.service';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { IAsistenciaEdit } from '../../DTO/iasistencia-edit';
import { IGenericData } from 'src/app/modules/generic/Responses/igeneric-data';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-update-asistencia-dialog',
	templateUrl: './update-asistencia-dialog.component.html',
	styleUrls: ['./update-asistencia-dialog.component.scss'],
})
export class UpdateAsistenciaDialogComponent implements AfterViewInit {
	entitySource: BehaviorSubject<IAsistenciaEdit | null> =
		new BehaviorSubject<IAsistenciaEdit | null>(null);
	entity$: Observable<IAsistenciaEdit | null> =
		this.entitySource.asObservable();

	categoriaAsistencia!: number;
	tipoAsistencias!: number[];
	unidadSelected: FormControl = new FormControl('');
	miembroSelected: FormControl = new FormControl('');

	constructor(
		private _asistencias: AsistenciasService,
		public dialogRef: MatDialogRef<UpdateAsistenciaDialogComponent>,
		@Inject(MAT_DIALOG_DATA)
		public params: {
			id: number;
			types: string[];
			categoria: string;
			denominacion: string;
		},
		public _cache: CacheService
	) {
		this.unidadSelected.valueChanges.subscribe((value: string) => {
			setTimeout(() => this._cache.getDenominaciones(value), 1000);
		});
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

	async saveChanges(): Promise<void> {
		const entity: IAsistenciaEdit | null = await firstValueFrom(
			this.entity$
		);
		if (entity) {
			this._asistencias.CompletarInformacionAsistencia({
				id: entity.id as number,
				identificacion: entity.identificacion,
				nombre: entity.nombre,
				apellido: entity.apellido,
				telefono: entity.telefono,
				genero: 0,
				esExtranjero: entity.esExtranjero,
				placa: '',
				vehiculoTipoId: entity.vehiculoTipoId,
				vehiculoMarcaId: entity.vehiculoMarcaId,
				vehiculoColorId: entity.vehiculoColorId,
				vehiculoModeloId: entity.vehiculoModeloId,
				provinciaId: entity.provinciaId,
				comentario: entity.comentario,
				direccion: '',
				municipioId: entity.municipioId,
				tipoAsistencias: this.tipoAsistencias,
				miembroId: 0,
				denominacionId: this.unidadSelected.value.id,
			});
		}

		//if (entity) this._asistencias.Update<IAsistencia>(entity);
	}
}

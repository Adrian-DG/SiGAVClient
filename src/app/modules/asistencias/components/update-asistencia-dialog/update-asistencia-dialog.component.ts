import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AsistenciasService } from '../../services/asistencias.service';
import { IAsistencia } from '../../entities/iasistencia';
import { CacheService } from 'src/app/modules/generic/services/cache/cache.service';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { IAsistenciaEdit } from '../../DTO/iasistencia-edit';

@Component({
	selector: 'app-update-asistencia-dialog',
	templateUrl: './update-asistencia-dialog.component.html',
	styleUrls: ['./update-asistencia-dialog.component.scss'],
})
export class UpdateAsistenciaDialogComponent implements AfterViewInit {
	entitySource: BehaviorSubject<IAsistencia | null> =
		new BehaviorSubject<IAsistencia | null>(null);
	entity$: Observable<IAsistencia | null> = this.entitySource.asObservable();

	constructor(
		private _asistencias: AsistenciasService,
		public dialogRef: MatDialogRef<UpdateAsistenciaDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public params: { id: number },
		public _cache: CacheService
	) {}

	ngAfterViewInit(): void {
		this._asistencias
			.GetById<IAsistencia>(this.params.id)
			.subscribe((data: IAsistencia) => {
				const resources = [
					'VehiculoTipo',
					'VehiculoColores',
					'VehiculoMarca',
					'VehiculoModelo',
					'provincias',
					'municipios',
				];

				resources.forEach((item: string) => {
					if (item === 'municipios') {
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

	async saveChanges(): Promise<void> {
		const entity: IAsistencia | null = await firstValueFrom(this.entity$);
		if (entity) {
			this._asistencias.CompletarInformacionAsistencia({
				id: entity.id as number,
				identificacion: entity.identificacion,
				nombre: entity.nombre,
				apellido: entity.apellido,
				telefono: entity.telefono,
				genero: 0,
				placa: '',
				vehiculoTipoId: entity.vehiculoTipoId,
				vehiculoMarcaId: entity.vehiculoMarcaId,
				vehiculoColorId: entity.vehiculoColorId,
				vehiculoModeloId: entity.vehiculoModeloId,
				provinciaId: entity.provinciaId,
				comentario: entity.comentarios,
				direccion: '',
				municipioId: entity.municipioId,
				tipoAsistencias: [],
			});
		}

		//if (entity) this._asistencias.Update<IAsistencia>(entity);
	}
}

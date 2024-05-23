import { AfterViewInit, Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AsistenciasService } from '../../services/asistencias.service';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { IAsistenciaCalidadViewModel } from '../../DTO/iasistencia-calidad-view-model';
import { IAsistenciaCalidadCreate } from '../../DTO/iasistencia-calidad-create';
import { IServerResponse } from 'src/app/modules/generic/Responses/iserver-response';
import { IAsistenciaCalidadEdit } from '../../DTO/iasistencia-calidad-edit';

@Component({
	selector: 'app-asistencia-calidad-dialog',
	templateUrl: './asistencia-calidad-dialog.component.html',
	styleUrls: ['./asistencia-calidad-dialog.component.scss'],
})
export class AsistenciaCalidadDialogComponent implements OnInit, AfterViewInit {
	isLoading: boolean = false;
	isCreating: boolean = false;
	asistenciaSource = new BehaviorSubject<IAsistenciaCalidadViewModel | null>(
		null
	);
	asistencia$ = this.asistenciaSource.asObservable();

	asistenciaDto: IAsistenciaCalidadCreate = {
		fueContactado: false,
		comentario: '',
		valoracion: -1,
		usuarioId: 0,
		asistenciaId: 0,
	};

	constructor(
		public dialogRef: MatDialogRef<AsistenciaCalidadDialogComponent>,
		private _asistencias: AsistenciasService,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			id: number;
			identificacion: string;
			nombre: string;
			telefono: string;
		}
	) {}

	ngOnInit(): void {
		this.isLoading = !this.isLoading;
	}

	ngAfterViewInit(): void {
		this._asistencias
			.GetRegistroCalidadAsistencia(this.data.id)
			.subscribe((data: IAsistenciaCalidadViewModel) => {
				if (data == null) {
					this.isCreating = !this.isCreating;
				}
				this.asistenciaSource.next(data);
				setTimeout(() => {
					this.isLoading = !this.isLoading;
				}, 2000);
			});
	}

	get areFieldsValid() {
		return this.asistenciaDto.valoracion > -1;
	}

	create(): void {
		if (
			confirm(
				'¿Se guardaran los cambios sobre la valoración de esta asistencia, esta seguro de continuar?'
			)
		) {
			this._asistencias
				.CreateRegistroCalidadAsistencia({
					asistenciaId: this.data.id,
					valoracion: this.asistenciaDto.valoracion,
					comentario: this.asistenciaDto.comentario,
					fueContactado: this.asistenciaDto.fueContactado,
					usuarioId: 0,
				})
				.subscribe((response: IServerResponse) => {
					alert(response.message);
					if (response.status) {
						this.dialogRef.close();
					}
				});
		}
	}

	async edit(): Promise<void> {
		if (
			confirm(
				'¿Se actualizaran algunas informaciones, esta seguro de continuar?'
			)
		) {
			const asistencia = await firstValueFrom(this.asistencia$);
			if (asistencia) {
				this._asistencias
					.EditRegistroCalidadAsistencia(asistencia?.id, {
						fueContactado: asistencia?.fueContactado,
						comentario: asistencia?.comentario,
						valoracion: asistencia?.valoracion,
						asistenciaId: 0,
						usuarioId: 0,
					})
					.subscribe((response: IServerResponse) => {
						alert(response.message);
						if (response.status) {
							this.dialogRef.close();
						}
					});
			}
		}
	}
}

import { AfterViewInit, Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AsistenciasService } from '../../services/asistencias.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAsistenciaCalidadViewModel } from '../../DTO/iasistencia-calidad-view-model';

@Component({
	selector: 'app-asistencia-calidad-dialog',
	templateUrl: './asistencia-calidad-dialog.component.html',
	styleUrls: ['./asistencia-calidad-dialog.component.scss'],
})
export class AsistenciaCalidadDialogComponent implements AfterViewInit {
	asistenciaSource = new BehaviorSubject<IAsistenciaCalidadViewModel | null>(
		null
	);
	asistencia$ = this.asistenciaSource.asObservable();

	constructor(
		public dialogRef: MatDialogRef<AsistenciaCalidadDialogComponent>,
		private _asistencias: AsistenciasService,
		@Inject(MAT_DIALOG_DATA) public data: { id: number }
	) {}

	ngAfterViewInit(): void {
		this._asistencias
			.GetRegistroCalidadAsistencia(this.data.id)
			.subscribe((data: IAsistenciaCalidadViewModel) => {
				this.asistenciaSource.next(data);
			});
	}

	create(): void {}
}

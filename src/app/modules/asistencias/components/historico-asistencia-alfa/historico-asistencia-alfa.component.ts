import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AsistenciasService } from '../../services/asistencias.service';
import { IAsistenciaPreHospitalariaMinorDetailsViewModel } from '../../viewModels/iasistencia-pre-hospitalaria-minor-details-view-model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-historico-asistencia-alfa',
	templateUrl: './historico-asistencia-alfa.component.html',
	styleUrls: ['./historico-asistencia-alfa.component.scss'],
})
export class HistoricoAsistenciaAlfaComponent implements AfterViewInit {
	constructor(
		public dialogRef: MatDialogRef<HistoricoAsistenciaAlfaComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: { id: number; unidadAlfa: string },
		private readonly _asistencias: AsistenciasService
	) {}

	displayedColumns: string[] = [
		'identificacion',
		'ciudadano',
		'telefono',
		'medico',
		'fecha',
	];

	datasource =
		new MatTableDataSource<IAsistenciaPreHospitalariaMinorDetailsViewModel>(
			[]
		);

	ngAfterViewInit(): void {
		this._asistencias
			.GetHistorialAsistenciaPorAlfa(this.data.id)
			.subscribe(
				(data: IAsistenciaPreHospitalariaMinorDetailsViewModel[]) => {
					this.datasource.data = data;
				}
			);
	}
}

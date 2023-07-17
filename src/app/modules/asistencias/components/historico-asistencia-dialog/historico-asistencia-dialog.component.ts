import {
	Component,
	OnInit,
	Inject,
	ViewChild,
	AfterViewInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IHistoricoViewModel } from '../../viewModels/ihistorico-view-model';
import { AsistenciasService } from '../../services/asistencias.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
	selector: 'app-historico-asistencia-dialog',
	templateUrl: './historico-asistencia-dialog.component.html',
	styleUrls: ['./historico-asistencia-dialog.component.scss'],
})
export class HistoricoAsistenciaDialogComponent
	implements OnInit, AfterViewInit
{
	private id!: number;
	displayedColumns: string[] = [
		'ficha',
		'rango',
		'cedula',
		'nombre',
		'fecha',
		'usuario',
	];

	datasource = new MatTableDataSource<IHistoricoViewModel>([]);
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	constructor(
		private $activeRoute: ActivatedRoute,
		private _asistencias: AsistenciasService,
		public dialogRef: MatDialogRef<HistoricoAsistenciaDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { id: number }
	) {}

	ngOnInit(): void {
		this._asistencias
			.GetHistorialAsistencia(this.data.id)
			.subscribe(
				(response: IHistoricoViewModel[]) =>
					(this.datasource.data = response)
			);
	}

	ngAfterViewInit(): void {
		this.datasource.paginator = this.paginator;
	}
}

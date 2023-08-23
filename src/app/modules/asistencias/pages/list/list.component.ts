import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IPaginationFilters } from 'src/app/modules/generic/DTO/ipagination-filters';
import { IPagedData } from 'src/app/modules/generic/Responses/ipaged-data';
import { IUpdateAsistencia } from '../../DTO/iupdate-asistencia';
import { AsistenciasService } from '../../services/asistencias.service';
import { IAsistenciaViewModel } from '../../viewModels/iasistencia-view-model';
import { IServerResponse } from 'src/app/modules/generic/Responses/iserver-response';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PicturesDialogComponent } from '../../components/pictures-dialog/pictures-dialog.component';
import { AsistenciaFilterByDateDialogComponent } from '../../components/asistencia-filter-by-date-dialog/asistencia-filter-by-date-dialog.component';
import { ReasignarUnidadDialogComponent } from '../../components/reasignar-unidad-dialog/reasignar-unidad-dialog.component';
import { HistoricoAsistenciaDialogComponent } from '../../components/historico-asistencia-dialog/historico-asistencia-dialog.component';
import { IAsistenciaPaginationFilter } from '../../DTO/iasistencia-pagination-filter';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';

// to validate dialog data
export interface IDialogData {
	id: number;
	cedula: string;
	placa: string;
}

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit {
	constructor(
		public _asistencias: AsistenciasService,
		public dialog: MatDialog,
		public _auth: AuthService
	) {}

	displayedColumns: string[] = [
		'id',
		'ciudadano',
		'vehiculo',
		'unidad',
		'agente',
		'creacion',
		'acciones',
	];

	pageSizeOptions = [5, 10, 25, 100];
	totalRows: number = 0;
	filters: IAsistenciaPaginationFilter = {
		page: 0,
		size: 5,
		searchTerm: '',
		status: false,
		estatusAsistencia: 0,
	};

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	dataSource = new MatTableDataSource<IAsistenciaViewModel>();

	ngOnInit(): void {
		this.loadData();
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	hasValidStatus(rol: number): boolean {
		return [1, 2, 3].includes(rol);
	}

	changeStatus(): void {
		this.filters.page = 0;
		this.loadData();
	}

	stateSelection: number = 1;

	loadData(): void {
		this._asistencias
			.getAllAsistencias(this.filters)
			.subscribe((data: IPagedData<IAsistenciaViewModel>) => {
				this.dataSource.data = data.items;
				setTimeout(() => {
					this.paginator.pageIndex = this.filters.page;
					this.paginator.pageSize = this.filters.size;
					this.paginator.length = data.totalCount;
				});
			});
	}

	pageChanged(event: PageEvent): void {
		this.totalRows = event.length;
		this.filters.size = event.pageSize;
		this.filters.page = event.pageIndex;
		this.loadData();
	}

	actualizarAsistencia(id: number, estatus: number): void {
		if (confirm(`Esta seguro de terminar esta asistencia ?`)) {
			let model: IUpdateAsistencia = {
				id: id,
				estatusAsistencia: estatus,
				codUsuario: this._asistencias.userId,
			};
			this._asistencias
				.updateAsistenciaCompletar(model)
				.subscribe((response: IServerResponse) => this.loadData());
		}
	}

	onReportSelection(value: number): void {
		switch (value) {
			case 1:
				console.log('value: ', value);
				this.getReporteResumenAsistenciasDiario();
				break;
			case 2:
				this.getReporteAsistenciasDetalles();
				break;
			case 3:
				this.dialog.open(AsistenciaFilterByDateDialogComponent);
		}
	}

	getReporteAsistenciasDetalles(): void {
		this._asistencias
			.GetReporteDetalleAsistencias()
			.subscribe((response) => {
				let filename = response.headers
					.get('content-disposition')
					?.split(';')[1]
					.split('=')[1];
				let blob: Blob = response.body as Blob;
				let a = document.createElement('a');

				a.download = filename ?? '';
				a.href = window.URL.createObjectURL(blob);
				a.click();
			});
	}

	getReporteResumenAsistenciasDiario(): void {
		this._asistencias
			.GetReporteResumenAsistenciasDiario()
			.subscribe((response) => {
				let filename = response.headers
					.get('content-disposition')
					?.split(';')[1]
					.split('=')[1];
				let blob: Blob = response.body as Blob;
				let a = document.createElement('a');

				a.download = filename ?? '';
				a.href = window.URL.createObjectURL(blob);
				a.click();
			});
	}

	enableCompleteBtn(status: string): boolean {
		// return ['COMPLETADA', 'PENDIENTE'].includes(status);
		return ['COMPLETADA'].includes(status);
	}

	getRowClass(row: any) {
		return {
			enCurso: row.estatusAsistencia == 'EN_CURSO',
			pendiente: row.estatusAsistencia == 'PENDIENTE',
			completada: row.estatusAsistencia == 'COMPLETADA',
		};
	}

	private modalConfig: MatDialogConfig = {
		minWidth: '500px',
		minHeight: '150px',
		maxWidth: '800px',
		maxHeight: '600px',
		autoFocus: true,
	};

	openPicturesDialog(id: number, cedula: string, placa: string): void {
		this.dialog.open(PicturesDialogComponent, {
			data: { id: id, cedula: cedula, placa: placa },
			...this.modalConfig,
		});
	}

	copyLocationCoordinates(coords: string | null): void {
		console.log('Coordenadas: ', coords);
		if (coords) {
			navigator.clipboard.writeText(coords);
		}

		alert(
			coords
				? `Se copiaron las coordenadas ${coords}`
				: 'Error: Las coordenadas no estan disponibles!!'
		);
	}

	openReasignationModal(item: IAsistenciaViewModel): void {
		this.dialog.open(ReasignarUnidadDialogComponent, {
			data: {
				idAsistencia: item.id,
				tramo: item.tramo,
				denominacion: item.denominacionUnidad,
				ficha: item.fichaUnidad,
			},
			...this.modalConfig,
		});
	}

	openHistoricoModal(id: number): void {
		this.dialog.open(HistoricoAsistenciaDialogComponent, {
			data: { id: id },
			...this.modalConfig,
		});
	}
}

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IPaginationFilters } from 'src/app/modules/generic/DTO/ipagination-filters';
import { IPagedData } from 'src/app/modules/generic/Responses/ipaged-data';
import { IUpdateAsistencia } from '../../DTO/iupdate-asistencia';
import { AsistenciasService } from '../../services/asistencias.service';
import { IAsistenciaViewModel } from '../../viewModels/iasistencia-view-model';
import { IServerResponse } from 'src/app/modules/generic/Responses/iserver-response';
import { MatDialog } from '@angular/material/dialog';
import { PicturesDialogComponent } from '../../components/pictures-dialog/pictures-dialog.component';

// to validate dialog data
export interface IDialogData {
	id: number;
}

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit {
	constructor(
		public _asistencias: AsistenciasService,
		public dialog: MatDialog
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
	filters: IPaginationFilters = {
		page: 0,
		size: 5,
		searchTerm: '',
		status: false,
	};

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	dataSource = new MatTableDataSource<IAsistenciaViewModel>();

	ngOnInit(): void {
		this.loadData();
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	changeStatus(): void {
		this.filters.page = 0;
		this.loadData();
	}

	stateSelection: number = 1;

	loadData(): void {
		this._asistencias.showSpinner();
		this.filters.status = this.stateSelection == 3;
		this._asistencias
			.getAllAsistencias(this.filters)
			.subscribe((data: IPagedData<IAsistenciaViewModel>) => {
				let records = [];
				switch (this.stateSelection) {
					case 1:
						records = data.items.filter(
							(x) => x.estatusAsistencia == 'PENDIENTE'
						);
						break;
					case 2:
						records = data.items.filter(
							(x) => x.estatusAsistencia == 'EN_CURSO'
						);
						break;
					case 3:
						records = data.items.filter(
							(x) => x.estatusAsistencia == 'COMPLETADA'
						);
						break;
					default:
						records = data.items;
				}

				this.dataSource.data = records;

				setTimeout(() => {
					this.paginator.pageIndex = this.filters.page;
					this.paginator.pageSize = this.filters.size;
					this.paginator.length = this.filters.status
						? data.totalCount
						: records.length;
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
			this._asistencias.showSpinner();
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
		this._asistencias.showSpinner();
		switch (value) {
			case 1:
				console.log('value: ', value);
				this.getReporteResumenAsistenciasDiario();
				break;
			case 2:
				this.getReporteAsistenciasDetalles();
				break;
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
		return ['COMPLETADA', 'PENDIENTE'].includes(status);
	}

	getRowClass(row: any) {
		return {
			enCurso: row.estatusAsistencia == 'EN_CURSO',
			pendiente: row.estatusAsistencia == 'PENDIENTE',
			completada: row.estatusAsistencia == 'COMPLETADA',
		};
	}

	openPicturesDialog(id: number): void {
		this.dialog.open(PicturesDialogComponent, {
			data: { id: id },
			minWidth: '600px',
			minHeight: '150px',
			maxWidth: '800px',
			maxHeight: '600px',
			autoFocus: true,
		});
	}
}

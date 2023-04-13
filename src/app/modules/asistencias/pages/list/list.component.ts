import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IPaginationFilters } from 'src/app/modules/generic/DTO/ipagination-filters';
import { IPagedData } from 'src/app/modules/generic/Responses/ipaged-data';
import { IUpdateAsistencia } from '../../DTO/iupdate-asistencia';
import { AsistenciasService } from '../../services/asistencias.service';
import { IAsistenciaViewModel } from '../../viewModels/iasistencia-view-model';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit {
	constructor(public _asistencias: AsistenciasService) {}

	displayedColumns: string[] = [
		'id',
		'agente',
		'unidad',
		'ciudadano',
		'vehiculo',
		'detalles',
		'ubicacion',
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
		const model: IUpdateAsistencia = { id: id, estatusAsistencia: estatus };
		this._asistencias.updateAsistenciaCompletar(model);
		this.loadData();
	}

	getReporteResumenAsistenciasDiario(): void {
		console.log('resumen diario');
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
}

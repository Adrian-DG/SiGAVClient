import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { IPaginationFilters } from 'src/app/modules/generic/DTO/ipagination-filters';
import { IAsisteciaPreHospitalariaViewModel } from '../../interfaces/iasistecia-pre-hospitalaria-view-model';
import { IPagedData } from 'src/app/modules/generic/Responses/ipaged-data';
import { MatTableDataSource } from '@angular/material/table';
import { AsistenciPreHospitalariaService } from '../../services/asistenci-pre-hospitalaria.service';
import { IAsistenciaPaginationFilter } from 'src/app/modules/asistencias/DTO/iasistencia-pagination-filter';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
})
export class ListComponent {
	displayedColumns = [
		'#',
		'ciudadano',
		'ubicacion',
		'asistencia',
		'personal',
		'acciones',
	];
	pageSizeOptions = [5, 10, 25, 100];
	totalRows: number = 0;

	filters: IAsistenciaPaginationFilter = {
		page: 0,
		size: 5,
		searchTerm: '',
		status: true,
		estatusAsistencia: 0,
	};

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	dataSource = new MatTableDataSource<IAsisteciaPreHospitalariaViewModel>();

	constructor(
		private _asistenciaPreHospitalaria: AsistenciPreHospitalariaService
	) {}

	ngOnInit(): void {
		this.loadData();
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	loadData(): void {
		this._asistenciaPreHospitalaria
			.GetAsistenciaPreHospitalaria(this.filters)
			.subscribe(
				(data: IPagedData<IAsisteciaPreHospitalariaViewModel>) => {
					console.log(data.items);
					this.dataSource.data = data.items;
					setTimeout(() => {
						this.paginator.pageIndex = this.filters.page;
						this.paginator.pageSize = this.filters.size;
						this.paginator.length = data.totalCount;
					});
				}
			);
	}

	pageChanged(event: PageEvent): void {
		this.totalRows = event.length;
		this.filters.size = event.pageSize;
		this.filters.page = event.pageIndex;
		this.loadData();
	}
}

import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { IPaginationFilters } from 'src/app/modules/generic/DTO/ipagination-filters';
import { IAsisteciaPreHospitalariaViewModel } from '../../interfaces/iasistecia-pre-hospitalaria-view-model';
import { IPagedData } from 'src/app/modules/generic/Responses/ipaged-data';
import { MatTableDataSource } from '@angular/material/table';
import { AsistenciPreHospitalariaService } from '../../services/asistenci-pre-hospitalaria.service';
import { IAsistenciaPaginationFilter } from 'src/app/modules/asistencias/DTO/iasistencia-pagination-filter';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReportModalComponent } from '../../components/report-modal/report-modal.component';
import { Roles } from 'src/app/modules/asistencias/pages/list/list.component';
import { DetailsModalComponent } from '../../components/details-modal/details-modal.component';
import { DialogConfig } from '@angular/cdk/dialog';

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
		public _asistenciaPreHospitalaria: AsistenciPreHospitalariaService,
		private dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.loadData();
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	dialogConfiguration: MatDialogConfig = {
		minWidth: '600px',
		minHeight: '200px',
		maxWidth: '800px',
		maxHeight: '600px',
		autoFocus: true,
	};

	getRowClass(row: any) {
		return {
			pendiente: row.estatusAsistencia == 1,
			enCurso: row.estatusAsistencia == 2,
			completada: row.estatusAsistencia == 3,
		};
	}

	hasValidStatus(rol: number): boolean {
		return [Roles.Administrador].includes(rol);
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

	displayReportDialog(): void {
		this.dialog.open(ReportModalComponent, this.dialogConfiguration);
	}

	showDetailsDialog(id: number): void {
		console.log('Id: ', id);
		this.dialog.open(DetailsModalComponent, {
			...this.dialogConfiguration,
			data: { id: id },
		});
	}
}

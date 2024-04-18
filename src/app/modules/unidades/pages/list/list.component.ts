import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IPaginationFilters } from 'src/app/modules/generic/DTO/ipagination-filters';
import { IPagedData } from 'src/app/modules/generic/Responses/ipaged-data';
import { UnidadesService } from '../../services/unidades.service';
import { IUnidadViewModel } from '../../viewModels/iunidad-view-model';
import { IUnidad } from '../../entities/iunidad';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReassignUnidadDialogComponent } from '../../components/reassign-unidad-dialog/reassign-unidad-dialog.component';
import { IServerResponse } from 'src/app/modules/generic/Responses/iserver-response';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit {
	constructor(
		private _unidades: UnidadesService,
		private dialog: MatDialog
	) {}

	displayedColumns: string[] = [
		'id',
		'ficha',
		'denominacion',
		'tipoUnidad',
		'tramo',
		'acciones',
	];

	pageSizeOptions = [5, 10, 25, 100];
	totalRows: number = 0;
	filters: IPaginationFilters = {
		page: 0,
		size: 5,
		searchTerm: '',
		status: true,
	};

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	dataSource = new MatTableDataSource<IUnidadViewModel>();

	ngOnInit(): void {
		this.loadData();
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	loadData(): void {
		this._unidades
			.getAllUnidades(this.filters)
			.subscribe((data: IPagedData<IUnidadViewModel>) => {
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

	private modalConfig: MatDialogConfig = {
		minWidth: '500px',
		minHeight: '150px',
		maxWidth: '800px',
		maxHeight: '600px',
		autoFocus: true,
	};

	showReassignUnidadDialog(item: IUnidadViewModel): void {
		const dialog = this.dialog.open(ReassignUnidadDialogComponent, {
			data: {
				unidadId: item.id,
				ficha: item.ficha,
				denominacion: item.denominacion,
				placa: item.placa,
			},
			...this.modalConfig,
		});

		dialog.afterClosed().subscribe(() => this.loadData());
	}

	desactivarUnidad(id: number): void {
		if (confirm('Se desactivara la siguiente unidad, esta seguro ?')) {
			this._unidades
				.desactivarUnidad(id as number)
				.subscribe((response: IServerResponse) => {
					alert(response.message);
					if (response.status) {
						this.loadData();
					}
				});
		}
	}
}

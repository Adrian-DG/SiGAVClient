import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IPaginationFilters } from 'src/app/modules/generic/DTO/ipagination-filters';
import { IPagedData } from 'src/app/modules/generic/Responses/ipaged-data';
import { INombreModelMetadata } from 'src/app/modules/generic/abstraction/inombre-model-metadata';
import { DenominacionesService } from '../../services/denominaciones.service';
import { MatDialog } from '@angular/material/dialog';
import { DenominacionesEditDialogComponent } from '../../components/denominaciones-edit-dialog/denominaciones-edit-dialog.component';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
})
export class ListComponent {
	displayedColumns = ['#', 'nombre', 'tipo', 'tramo', 'acciones'];
	pageSizeOptions = [5, 10, 25, 100];
	totalRows: number = 0;
	filters: IPaginationFilters = {
		page: 0,
		size: 5,
		searchTerm: '',
		status: true,
	};

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	dataSource = new MatTableDataSource<any>();

	constructor(
		private _denominaciones: DenominacionesService,
		private _dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.loadData();
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	loadData(): void {
		this._denominaciones
			.Get<INombreModelMetadata>(this.filters)
			.subscribe((data: IPagedData<any>) => {
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

	openEditDialog(item: any): void {
		this._dialog.open(DenominacionesEditDialogComponent, {
			minHeight: '200px',
			maxHeight: '400px',
			minWidth: '500px',
			maxWidth: '800px',
			role: 'dialog',
			data: { id: item.id, nombre: item.nombre },
		});
	}
}

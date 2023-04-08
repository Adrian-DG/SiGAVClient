import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ModeloService } from '../../services/modelo.service';
import { IPaginationFilters } from 'src/app/modules/generic/DTO/ipagination-filters';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IModeloViewModel } from '../../viewmodels/imodelo-view-model';
import { IPagedData } from 'src/app/modules/generic/Responses/ipaged-data';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit {
	displayedColumns = ['#', 'modelo', 'marca', 'tipo', 'acciones'];
	pageSizeOptions = [5, 10, 25, 100];
	totalRows: number = 0;
	filters: IPaginationFilters = {
		page: 1,
		size: 5,
		searchTerm: '',
		status: true,
	};

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	dataSource = new MatTableDataSource<IModeloViewModel>();

	constructor(private _modelos: ModeloService) {}

	ngOnInit(): void {
		this.loadData();
	}
	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	loadData(): void {
		this.filters.page = this.filters.page >= 1 ? this.filters.page : 1;
		this._modelos
			.getAllModelos(this.filters)
			.subscribe((data: IPagedData<IModeloViewModel>) => {
				this.dataSource.data = data.items;
				setTimeout(() => {
					this.paginator.pageIndex = this.filters.page - 1;
					this.paginator.pageSize = this.filters.size;
					this.paginator.length = data.totalCount;
				});
			});
	}

	pageChanged(event: PageEvent): void {
		this.totalRows = event.length;
		this.filters.size = event.pageSize;
		this.filters.page = event.pageIndex + 1;
		this.loadData();
	}
}

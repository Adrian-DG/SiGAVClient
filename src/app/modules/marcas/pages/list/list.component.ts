import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MarcasService } from '../../services/marcas.service';
import { IPaginationFilters } from 'src/app/modules/generic/DTO/ipagination-filters';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IPagedData } from 'src/app/modules/generic/Responses/ipaged-data';
import { INombreModelMetadata } from 'src/app/modules/generic/abstraction/inombre-model-metadata';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit {
	displayedColumns = ['#', 'marca', 'acciones'];
	pageSizeOptions = [5, 10, 25, 100];
	totalRows: number = 0;
	filters: IPaginationFilters = {
		page: 0,
		size: 5,
		searchTerm: '',
		status: true,
	};

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	dataSource = new MatTableDataSource<INombreModelMetadata>();

	constructor(private _marcas: MarcasService) {}

	ngOnInit(): void {
		this.loadData();
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	loadData(): void {
		this.filters.page += 1;
		this._marcas
			.Get<INombreModelMetadata>(this.filters)
			.subscribe((data: IPagedData<INombreModelMetadata>) => {
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
		this.filters.page = event.pageIndex;
		this.loadData();
	}
}

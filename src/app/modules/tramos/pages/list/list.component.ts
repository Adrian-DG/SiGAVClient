import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IPaginationFilters } from 'src/app/modules/generic/DTO/ipagination-filters';
import { IPagedData } from 'src/app/modules/generic/Responses/ipaged-data';
import { TramoService } from '../../services/tramo.service';
import { ITramoViewModel } from '../../viewModels/itramo-view-model';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit {
	searchControl = new FormControl('');
	constructor(private _tramos: TramoService) {}

	displayedColumns = [
		'id',
		'nombre',
		'regionAsistencia',
		'pertenece',
		'acciones',
	];
	pageSizeOptions = [10, 25, 100];
	totalRows: number = 0;
	filters: IPaginationFilters = {
		page: 0,
		size: 10,
		searchTerm: '',
		status: true,
	};

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	dataSource = new MatTableDataSource<ITramoViewModel>();

	ngOnInit(): void {
		this.searchControl.valueChanges
			.pipe(distinctUntilChanged(), debounceTime(300))
			.subscribe((value: string | null) => {
				this.filters.searchTerm = value ?? '';
				this.filters.page = 0;
				this.loadData();
			});
	}

	ngAfterViewInit(): void {
		this.loadData();
		this.dataSource.paginator = this.paginator;
	}

	loadData(): void {
		this._tramos
			.getAllTramos(this.filters)
			.subscribe((data: IPagedData<ITramoViewModel>) => {
				this.dataSource.data = data.items;
				this.totalRows = data.totalCount;
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

	openDialog(id: number): void {}
}

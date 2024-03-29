import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IPaginationFilters } from 'src/app/modules/generic/DTO/ipagination-filters';
import { IPagedData } from 'src/app/modules/generic/Responses/ipaged-data';
import { MiembroService } from '../../services/miembro.service';
import { IMiembroViewModel } from '../../viewModels/imiembro-view-model';
import { IServerResponse } from 'src/app/modules/generic/Responses/iserver-response';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit {
	totalRows = 0;
	filters: IPaginationFilters = {
		page: 0,
		size: 5,
		searchTerm: '',
		status: true,
	};

	pageSizeOptions = [5, 10, 25, 100];
	displayedColumns = [
		'id',
		'cedula',
		'nombreCompleto',
		'rango',
		'departamento',
		'institucion',
		//'creacion',
		'acciones',
	];

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	dataSource = new MatTableDataSource<IMiembroViewModel>();

	constructor(private _miembros: MiembroService) {}

	ngOnInit(): void {
		this.loadData();
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	loadData(): void {
		this._miembros
			.getAllMiembros(this.filters)
			.subscribe((data: IPagedData<IMiembroViewModel>) => {
				this.dataSource.data = data.items;
				setTimeout(() => {
					this.paginator.pageIndex = this.filters.page;
					this.paginator.pageSize = this.filters.size;
					this.paginator.length = data.totalCount;
				});
			});
	}

	pageChanged(event: PageEvent): void {
		console.log('Event: ', event);
		this.totalRows = event.length;
		this.filters.size = event.pageSize;
		this.filters.page = event.pageIndex;
		this.loadData();
	}

	UpdateEstatusMiembro(id: number, type: number): void {
		if (
			confirm(
				type == 1
					? 'Se cambiara el estatus de este miembro, esta seguro ?'
					: 'Se ocultara y deshabilitara este este miembro, esta seguro de continuar ?'
			)
		) {
			this._miembros
				.UpdateEstatusMiembro(id, type)
				.subscribe((response: IServerResponse) => {
					this.filters.status = !this.filters.status;
					this.loadData();
					alert(response.message);
				});
		}
		this.loadData();
	}
}

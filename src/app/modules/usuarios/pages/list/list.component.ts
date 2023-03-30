import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IPaginationFilters } from 'src/app/modules/generic/DTO/ipagination-filters';
import { IPagedData } from 'src/app/modules/generic/Responses/ipaged-data';
import { UsuarioService } from '../../services/usuario.service';
import { IUsuarioViewModel } from '../../viewModels/iusuario-view-model';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit {
	pageSizeOptions = [5, 10, 50, 100];
	totalRows = 0;
	filters: IPaginationFilters = {
		page: 0,
		size: 5,
		searchTerm: '',
		status: true,
	};

	displayedColumns = [
		'id',
		'cedula',
		'nombreCompleto',
		'nombreUsuario',
		'esAdministrador',
		'estatus',
		'acciones',
	];

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	dataSource = new MatTableDataSource<IUsuarioViewModel>();

	constructor(private _usuarios: UsuarioService) {}

	ngOnInit(): void {
		this.loadData();
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	loadData(): void {
		this.filters.page += 1;
		this._usuarios
			.getAllUsuarios(this.filters)
			.subscribe((data: IPagedData<IUsuarioViewModel>) => {
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

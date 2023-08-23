import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IPaginationFilters } from 'src/app/modules/generic/DTO/ipagination-filters';
import { IPagedData } from 'src/app/modules/generic/Responses/ipaged-data';
import { UsuarioService } from '../../services/usuario.service';
import { IUsuarioViewModel } from '../../viewModels/iusuario-view-model';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '../../components/change-password-dialog/change-password-dialog.component';
import { ChangePasswordDTO } from '../../DTO/change-password-dto';
import { UserPasswordInfo } from '../../DTO/user-password-info';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit {
	pageSizeOptions = [5, 10, 50, 100];
	totalRows = 0;
	filters: IPaginationFilters = {
		page: 1,
		size: 5,
		searchTerm: '',
		status: true,
	};

	displayedColumns = [
		'id',
		'nombreUsuario',
		'tipoUsuario',
		'estatus',
		'acciones',
	];

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	dataSource = new MatTableDataSource<IUsuarioViewModel>();

	constructor(private _usuarios: UsuarioService, private dialog: MatDialog) {}

	ngOnInit(): void {
		this.loadData();
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	loadData(): void {
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

	UpdateUsuarioEstatus(id: number): void {
		this._usuarios.UpdateUsuarioEstatus(id);
	}

	openDialog(item: IUsuarioViewModel): void {
		const model: UserPasswordInfo = {
			userId: item.id,
			username: item.nombreUsuario,
		};

		this.dialog.open(ChangePasswordDialogComponent, {
			minHeight: '200px',
			maxHeight: '400px',
			minWidth: '500px',
			maxWidth: '800px',
			role: 'dialog',
			data: model,
		});
	}
}

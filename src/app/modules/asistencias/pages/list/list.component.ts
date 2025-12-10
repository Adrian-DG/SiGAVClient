import {
	Component,
	OnInit,
	AfterViewInit,
	ViewChild,
	LOCALE_ID,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IPaginationFilters } from 'src/app/modules/generic/DTO/ipagination-filters';
import { IPagedData } from 'src/app/modules/generic/Responses/ipaged-data';
import { IUpdateAsistencia } from '../../DTO/iupdate-asistencia';
import { AsistenciasService } from '../../services/asistencias.service';
import { IAsistenciaViewModel } from '../../viewModels/iasistencia-view-model';
import { IServerResponse } from 'src/app/modules/generic/Responses/iserver-response';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PicturesDialogComponent } from '../../components/pictures-dialog/pictures-dialog.component';
import { AsistenciaFilterByDateDialogComponent } from '../../components/asistencia-filter-by-date-dialog/asistencia-filter-by-date-dialog.component';
import { ReasignarUnidadDialogComponent } from '../../components/reasignar-unidad-dialog/reasignar-unidad-dialog.component';
import { HistoricoAsistenciaDialogComponent } from '../../components/historico-asistencia-dialog/historico-asistencia-dialog.component';
import { IAsistenciaPaginationFilter } from '../../DTO/iasistencia-pagination-filter';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { ReporteEstadisticoDialogComponent } from '../../components/reporte-estadistico-dialog/reporte-estadistico-dialog.component';
import { UpdateAsistenciaDialogComponent } from '../../components/update-asistencia-dialog/update-asistencia-dialog.component';
import { DetailAsistenciaDialogComponent } from '../../components/detail-asistencia-dialog/detail-asistencia-dialog.component';
import { AsistenciaCalidadDialogComponent } from '../../components/asistencia-calidad-dialog/asistencia-calidad-dialog.component';
import { IUserData } from 'src/app/modules/auth/interfaces/iuser-data';
import { ReportDialogCalidadComponent } from '../../components/report-dialog-calidad/report-dialog-calidad.component';
import { IAsistenciaPaginationAdvanceFilter } from '../../DTO/iasistencia-pagination-advance-filter';
import { HistoricoAsistenciaAlfaComponent } from '../../components/historico-asistencia-alfa/historico-asistencia-alfa.component';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ReportViewerDialogComponent } from '../../components/report-viewer-dialog/report-viewer-dialog.component';
import { DatePipe } from '@angular/common';
import { UpdateTipoCierreDialogComponent } from '../../components/update-tipo-cierre-dialog/update-tipo-cierre-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { AsistenciaEstatusEnum } from '../../enums/asistencia-estatus.enum';
// to validate dialog data
export interface IDialogData {
	id: number;
	cedula: string;
	placa: string;
}

export enum Roles {
	AnalistaOperaciones = 1,
	CallCenterR5,
	GestionOperativa,
	Calidad,
}

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
	providers: [DatePipe, { provide: LOCALE_ID, useValue: 'es-ES' }],
})
export class ListComponent implements OnInit, AfterViewInit {
	constructor(
		public _asistencias: AsistenciasService,
		public dialog: MatDialog,
		public _auth: AuthService
	) {}

	displayedColumns: string[] = [
		'id',
		'ciudadano',
		'vehiculo',
		'unidad',
		'agente',
		'creacion',
		'acciones',
	];

	pageSizeOptions = [5, 10, 25, 100];
	totalRows: number = 0;
	filters: IAsistenciaPaginationAdvanceFilter = {
		page: 0,
		size: 100,
		searchTerm: '',
		status: false,
		estatusAsistencia: AsistenciaEstatusEnum.EN_PROCESO,
		initialDate: null,
		finalDate: null,
		tipoBusqueda: 1,
	};

	get Roles() {
		return Roles;
	}

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	dataSource = new MatTableDataSource<IAsistenciaViewModel>();

	searchBarControl = new FormControl('');

	stateSelection: number = 1;

	asistenciaEstatus = [
		{ value: 0, viewValue: 'Todas' },
		{ value: 1, viewValue: 'Pendientes' },
		{ value: 2, viewValue: 'En Proceso' },
		{ value: 3, viewValue: 'Completadas' },
	];

	ngOnInit(): void {
		this.dialog.afterAllClosed.subscribe(() => this.loadData());
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	clearFilters(): void {
		this.filters = {
			page: 0,
			size: 20,
			searchTerm: '',
			status: false,
			estatusAsistencia: 2,
			initialDate: null,
			finalDate: null,
			tipoBusqueda: 1,
		};
		this.searchBarControl.setValue('');
		this.loadData();
	}

	hasAnalystRole(role: number): boolean {
		return Roles.AnalistaOperaciones === role;
	}

	hasValidStatus(rol: number): boolean {
		return [
			Roles.AnalistaOperaciones,
			Roles.CallCenterR5,
			Roles.GestionOperativa,
		].includes(rol);
	}

	hasCompleteEstatus(item: IAsistenciaViewModel): boolean {
		return item.estatusAsistencia === 'COMPLETADA';
	}

	changeStatus(): void {
		this.filters.page = 0;
		this.loadData();
	}

	onSearchFiltering(): void {
		this.searchBarControl.valueChanges
			.pipe(debounceTime(500), distinctUntilChanged())
			.subscribe((value: string | null) => {
				if (value) {
					this.filters.searchTerm = value ?? '';
					this.filters.page = 0; // Reset to first page on search
					this.loadData();
				}
			});
	}

	onTabSelectionChange(event: any): void {
		this.stateSelection = event.index;
		this.filters.estatusAsistencia = this.stateSelection;
		this.filters.page = 0;
		this.loadData();
	}

	loadData(): void {
		this._asistencias
			.getAllAsistencias(this.filters)
			.subscribe((data: IPagedData<IAsistenciaViewModel>) => {
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

	actualizarAsistencia(id: number, estatus: number): void {
		if (confirm(`Esta seguro de terminar esta asistencia ?`)) {
			let model: IUpdateAsistencia = {
				id: id,
				estatusAsistencia: estatus,
				codUsuario: this._asistencias.userId,
			};
			this._asistencias
				.updateAsistenciaCompletar(model)
				.subscribe((response: IServerResponse) => {
					alert(response.message);
					setTimeout(() => this.loadData(), 2000);
				});
		}
	}

	actualizarTipoCierre(asistenciaId: number): void {
		this.dialog
			.open(UpdateTipoCierreDialogComponent, {
				data: { asistenciaId: asistenciaId },
			})
			.afterClosed()
			.subscribe((result) => {
				if (result) {
					alert('Tipo de cierre actualizado correctamente!!!.');
					this.loadData();
				} else {
					alert('Error: No se actualizó el tipo de cierre.');
				}
			});
	}

	onReportSelection(value: number): void {
		switch (value) {
			case 1:
				console.log('value: ', value);
				this.getReporteResumenAsistenciasDiario();
				break;
			case 2:
				this.getReporteAsistenciasDetalles();
				break;
			case 3:
				this.dialog.open(AsistenciaFilterByDateDialogComponent);
				break;
			case 4:
				this.openReporteEstadisticoModal();
				break;
			case 5:
				this.openAsistenciaCalidadReportModal();
				break;
			case 6:
				this.generarReporteHistoricoAsistenciasR5();
				break;
			case 7:
				this.getReporteAsistenciasSolicitadasR5();
				break;
		}
	}

	generarReporteHistoricoAsistenciasR5(): void {
		this._asistencias
			.generarReporteHistoricoAsistenciasR5(this.filters)
			.subscribe((response) => {
				if (response.body) {
					const blob = new Blob([response.body], {
						type: 'application/pdf',
					});
					const url = window.URL.createObjectURL(blob);

					this.dialog.open(ReportViewerDialogComponent, {
						data: { url: url },
						...this.modalConfig,
						width: '1000px',
						height: '800px',
					});
				}
			});
	}

	getReporteAsistenciasDetalles(): void {
		this._asistencias
			.GetReporteDetalleAsistencias()
			.subscribe((response) => {
				let filename = response.headers
					.get('content-disposition')
					?.split(';')[1]
					.split('=')[1];
				let blob: Blob = response.body as Blob;
				let a = document.createElement('a');

				a.download = filename ?? '';
				a.href = window.URL.createObjectURL(blob);
				a.click();
			});
	}

	getReporteResumenAsistenciasDiario(): void {
		this._asistencias
			.GetReporteResumenAsistenciasDiario()
			.subscribe((response) => {
				let filename = response.headers
					.get('content-disposition')
					?.split(';')[1]
					.split('=')[1];
				let blob: Blob = response.body as Blob;
				let a = document.createElement('a');

				a.download = filename ?? '';
				a.href = window.URL.createObjectURL(blob);
				a.click();
			});
	}

	getReporteAsistenciasSolicitadasR5(): void {
		this._asistencias
			.getReporteAsistenciasSolicitadasR5(this.filters)
			.subscribe((response) => {
				let filename = response.headers
					.get('content-disposition')
					?.split(';')[1]
					.split('=')[1];
				let blob: Blob = response.body as Blob;
				let a = document.createElement('a');
				a.download = filename ?? '';
				a.href = window.URL.createObjectURL(blob);
				a.click();
			});
	}

	enableCompleteBtn(status: string): boolean {
		// return ['COMPLETADA', 'PENDIENTE'].includes(status);
		return ['COMPLETADA'].includes(status);
	}

	getRowClass(row: any) {
		return {
			enCurso: row.estatusAsistencia == 'EN CURSO',
			pendiente: row.estatusAsistencia == 'PENDIENTE',
			completada: row.estatusAsistencia == 'COMPLETADA',
		};
	}

	isAvailableForQualityEvaluation(
		user: IUserData,
		item: IAsistenciaViewModel
	): boolean {
		return (
			[Roles.AnalistaOperaciones, Roles.Calidad].includes(
				user.rolUsuario
			) && item.estatusAsistencia == 'COMPLETADA'
		);
	}

	private modalConfig: MatDialogConfig = {
		minWidth: '500px',
		minHeight: '150px',
		maxWidth: '900px',
		maxHeight: '600px',
		autoFocus: true,
	};

	openPicturesDialog(id: number, cedula: string, placa: string): void {
		this.dialog.open(PicturesDialogComponent, {
			data: { id: id, cedula: cedula, placa: placa },
			...this.modalConfig,
		});
	}

	copyLocationCoordinates(coords: string | null): void {
		console.log('Coordenadas: ', coords);
		if (coords) {
			navigator.clipboard.writeText(coords);
		}

		alert(
			coords
				? `Se copiaron las coordenadas ${coords}`
				: 'Error: Las coordenadas no estan disponibles!!'
		);
	}

	openReasignationModal(item: IAsistenciaViewModel): void {
		this.dialog.open(ReasignarUnidadDialogComponent, {
			data: {
				idAsistencia: item.id,
				tramo: item.tramo,
				denominacion: item.denominacionUnidad,
				ficha: item.fichaUnidad,
			},
			...this.modalConfig,
		});
	}

	openHistoricoModal(id: number): void {
		this.dialog.open(HistoricoAsistenciaDialogComponent, {
			data: { id: id },
			...this.modalConfig,
		});
	}

	openReporteEstadisticoModal(): void {
		this.dialog.open(ReporteEstadisticoDialogComponent, {
			...this.modalConfig,
		});
	}

	openEditAsistenciaModal(item: IAsistenciaViewModel): void {
		console.log('item: ', item);
		const types = item.tipoAsistencias.map((x) => x.nombre);
		const categorias = item.tipoAsistencias.map(
			(x) => x.categoriaAsistencia
		)[0];
		this.dialog.open(UpdateAsistenciaDialogComponent, {
			data: {
				id: item.id,
				types: types,
				categoria: categorias,
				denominacion: item.denominacionUnidad,
				miembro: `${item.rangoAgente} | ${item.nombreAgente}`,
				fechaCreacion: item.fechaCreacion,
				tiempoLlegada: item.tiempoLlegada,
				tiempoCompletada: item.tiempoCompletada,
			},
			...this.modalConfig,
		});
	}

	openDetailsAsistenciaModal(model: IAsistenciaViewModel) {
		const { id, comentario } = model;
		const types = model.tipoAsistencias.map((x) => x.nombre);
		this.dialog.open(DetailAsistenciaDialogComponent, {
			data: { id, comment: comentario, types },
			...this.modalConfig,
		});
	}

	openAsistenciaCalidadModal(item: IAsistenciaViewModel): void {
		this.dialog.open(AsistenciaCalidadDialogComponent, {
			data: {
				id: item.id,
				identificacion: item.identificacion,
				nombre: item.nombreCiudadano,
				telefono: item.telefono,
			},
			...this.modalConfig,
		});
	}

	openAsistenciaCalidadReportModal(): void {
		this.dialog.open(ReportDialogCalidadComponent, {
			...this.modalConfig,
		});
	}

	openAsistenciaApoyoAlfa(element: IAsistenciaViewModel): void {
		this.dialog.open(HistoricoAsistenciaAlfaComponent, {
			data: { id: element.alfaId, unidadAlfa: element.unidadAlfa },
			...this.modalConfig,
		});
	}

	removeAsistencia(id: number): void {
		if (confirm('Esta seguro de eliminar la siguiente asistencia ?')) {
			this._asistencias
				.RemoveAsistencia(id)
				.subscribe((response: IServerResponse) => {
					alert(
						response
							? 'Asistencia eliminada correctamente'
							: 'Error al eliminar asistencia'
					);
					setTimeout(() => this.loadData(), 2000);
				});
		}
	}

	ConfirmarTiempoLlegada(id: number): void {
		if (confirm('Esta seguro de confirmar el tiempo de llegada ?')) {
			this._asistencias
				.ConfirmarTiempoLlegada(id)
				.subscribe((response: IServerResponse) => {
					alert(response.message);
					setTimeout(() => this.loadData(), 2000);
				});
		}
	}

	MarcarAsistenciaReportada511(id: number) {
		if (
			confirm(
				'Esta seguro de marcar la asistencia como reportada por 511?'
			)
		) {
			this._asistencias
				.MarcarAsistenciaReportada511(id)
				.subscribe((response: IServerResponse) => {
					alert(response.message);
					setTimeout(() => this.loadData(), 2000);
				});
		}
	}

	MarcarAsistenciaReportadaWhatsApp(id: number): void {
		if (
			confirm(
				'Esta seguro de marcar la asistencia como reportada por WhatsApp?'
			)
		) {
			this._asistencias
				.MarcarAsistenciaReportadaWhatsApp(id)
				.subscribe((response: IServerResponse) => {
					alert(response.message);
					setTimeout(() => this.loadData(), 2000);
				});
		}
	}
}

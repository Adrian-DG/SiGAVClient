import {
	Component,
	OnInit,
	AfterViewInit,
	OnDestroy,
	ViewChild,
	LOCALE_ID,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { ReportViewerDialogComponent } from '../../components/report-viewer-dialog/report-viewer-dialog.component';
import { DatePipe } from '@angular/common';
import { UpdateTipoCierreDialogComponent } from '../../components/update-tipo-cierre-dialog/update-tipo-cierre-dialog.component';
import { AsistenciaEstatusEnum } from '../../enums/asistencia-estatus.enum';
import { HttpResponse } from '@angular/common/http';
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
	private readonly destroy$ = new Subject<void>();
	private readonly defaultPageSize = 100;
	private readonly defaultSearchType = 1;
	private readonly defaultStatus = AsistenciaEstatusEnum.EN_PROCESO;

	constructor(
		public _asistencias: AsistenciasService,
		public dialog: MatDialog,
		public _auth: AuthService,
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
	filters: IAsistenciaPaginationAdvanceFilter = this.createDefaultFilters();

	get Roles() {
		return Roles;
	}

	get selectedStatusIndex(): number {
		return this.asistenciaEstatus.findIndex(
			(item) => item.value === this.filters.estatusAsistencia,
		);
	}

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	dataSource = new MatTableDataSource<IAsistenciaViewModel>();

	searchBarControl = new FormControl('');

	asistenciaEstatus = [
		{ value: AsistenciaEstatusEnum.TODAS, viewValue: 'Todas' },
		{ value: AsistenciaEstatusEnum.PENDIENTE, viewValue: 'Pendientes' },
		{ value: AsistenciaEstatusEnum.EN_PROCESO, viewValue: 'En Proceso' },
		{ value: AsistenciaEstatusEnum.COMPLETADA, viewValue: 'Completadas' },
	];

	ngOnInit(): void {
		this.listenToSearchChanges();
		this.dialog.afterAllClosed
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => this.loadData());
		this.loadData();
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	clearFilters(): void {
		this.filters = this.createDefaultFilters();
		this.searchBarControl.setValue('', { emitEvent: false });
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

	hasInProgressEstatus(item: IAsistenciaViewModel): boolean {
		return item.estatusAsistencia === 'EN CURSO';
	}

	changeStatus(): void {
		this.filters.page = 0;
		this.loadData();
	}

	private listenToSearchChanges(): void {
		this.searchBarControl.valueChanges
			.pipe(
				debounceTime(500),
				distinctUntilChanged(),
				takeUntil(this.destroy$),
			)
			.subscribe((value: string | null) => {
				this.filters.searchTerm = value?.trim() ?? '';
				this.filters.page = 0;
				this.loadData();
			});
	}

	onTabSelectionChange(event: { index: number }): void {
		this.filters.estatusAsistencia =
			this.asistenciaEstatus[event.index]?.value ?? this.defaultStatus;
		this.filters.page = 0;
		this.loadData();
	}

	loadData(): void {
		this._asistencias
			.getAllAsistencias(this.filters)
			.subscribe((data: IPagedData<IAsistenciaViewModel>) => {
				this.dataSource.data = data.items;
				this.totalRows = data.totalCount;
				setTimeout(() => {
					if (!this.paginator) {
						return;
					}

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
					this.scheduleRefresh();
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
			.subscribe((response) => this.downloadFileResponse(response));
	}

	getReporteResumenAsistenciasDiario(): void {
		this._asistencias
			.GetReporteResumenAsistenciasDiario()
			.subscribe((response) => this.downloadFileResponse(response));
	}

	getReporteAsistenciasSolicitadasR5(): void {
		this._asistencias
			.getReporteAsistenciasSolicitadasR5(this.filters)
			.subscribe((response) => this.downloadFileResponse(response));
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
		item: IAsistenciaViewModel,
	): boolean {
		return (
			[Roles.AnalistaOperaciones, Roles.Calidad].includes(
				user.rolUsuario,
			) && item.estatusAsistencia == 'COMPLETADA'
		);
	}

	private modalConfig: MatDialogConfig = {
		minWidth: '500px',
		minHeight: '150px',
		maxWidth: '1000px',
		maxHeight: '1000px',
		autoFocus: true,
	};

	openPicturesDialog(id: number, cedula: string, placa: string): void {
		this.dialog.open(PicturesDialogComponent, {
			data: { id: id, cedula: cedula, placa: placa },
			maxWidth: '1000px',
			maxHeight: '1000px',
			autoFocus: true,
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
				: 'Error: Las coordenadas no estan disponibles!!',
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
		const types = item.tipoAsistencias.map((x) => x.tipo);
		const categorias = item.tipoAsistencias.map((x) => x.categoria)[0];
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
		const types = model.tipoAsistencias.map((x) => x.tipo);
		this.dialog.open(DetailAsistenciaDialogComponent, {
			data: { id, comment: comentario, types: types },
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
							: 'Error al eliminar asistencia',
					);
					this.scheduleRefresh();
				});
		}
	}

	ConfirmarTiempoLlegada(id: number): void {
		if (confirm('Esta seguro de confirmar el tiempo de llegada ?')) {
			this._asistencias
				.ConfirmarTiempoLlegada(id)
				.subscribe((response: IServerResponse) => {
					alert(response.message);
					this.scheduleRefresh();
				});
		}
	}

	MarcarAsistenciaReportada511(id: number) {
		if (
			confirm(
				'Esta seguro de marcar la asistencia como reportada por 511?',
			)
		) {
			this._asistencias
				.MarcarAsistenciaReportada511(id)
				.subscribe((response: IServerResponse) => {
					alert(response.message);
					this.scheduleRefresh();
				});
		}
	}

	MarcarAsistenciaReportadaWhatsApp(id: number): void {
		if (
			confirm(
				'Esta seguro de marcar la asistencia como reportada por WhatsApp?',
			)
		) {
			this._asistencias
				.MarcarAsistenciaReportadaWhatsApp(id)
				.subscribe((response: IServerResponse) => {
					alert(response.message);
					this.scheduleRefresh();
				});
		}
	}

	private createDefaultFilters(): IAsistenciaPaginationAdvanceFilter {
		return {
			page: 0,
			size: this.defaultPageSize,
			searchTerm: '',
			status: true,
			estatusAsistencia: this.defaultStatus,
			initialDate: null,
			finalDate: null,
			tipoBusqueda: this.defaultSearchType,
		};
	}

	private scheduleRefresh(): void {
		setTimeout(() => this.loadData(), 2000);
	}

	private downloadFileResponse(response: HttpResponse<Blob>): void {
		const blob = response.body;

		if (!blob) {
			return;
		}

		const anchor = document.createElement('a');
		anchor.download = this.getDownloadFilename(response);
		anchor.href = window.URL.createObjectURL(blob);
		anchor.click();
	}

	private getDownloadFilename(response: HttpResponse<Blob>): string {
		return (
			response.headers
				.get('content-disposition')
				?.split(';')[1]
				?.split('=')[1]
				?.replace(/\"/g, '') ?? ''
		);
	}
}

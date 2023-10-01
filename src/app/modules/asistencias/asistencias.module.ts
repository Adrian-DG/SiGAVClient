import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsistenciasRoutingModule } from './asistencias-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { GenericModule } from '../generic/generic.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './pages/list/list.component';
import { CreateComponent } from './pages/create/create.component';
import { CedulaPipe } from './pipes/cedula.pipe';
import { TelefonoPipe } from './pipes/telefono.pipe';
import { PicturesDialogComponent } from './components/pictures-dialog/pictures-dialog.component';
import { AsistenciaFilterByDateDialogComponent } from './components/asistencia-filter-by-date-dialog/asistencia-filter-by-date-dialog.component';
import { ReasignarUnidadDialogComponent } from './components/reasignar-unidad-dialog/reasignar-unidad-dialog.component';
import { HistoricoAsistenciaDialogComponent } from './components/historico-asistencia-dialog/historico-asistencia-dialog.component';
import { HoraMilitarPipe } from './pipes/hora-militar.pipe';
import { ReporteEstadisticoDialogComponent } from './components/reporte-estadistico-dialog/reporte-estadistico-dialog.component';
import { UpdateAsistenciaDialogComponent } from './components/update-asistencia-dialog/update-asistencia-dialog.component';

@NgModule({
	declarations: [IndexComponent, ListComponent, CreateComponent, CedulaPipe, TelefonoPipe, PicturesDialogComponent, AsistenciaFilterByDateDialogComponent, ReasignarUnidadDialogComponent, HistoricoAsistenciaDialogComponent, HoraMilitarPipe, ReporteEstadisticoDialogComponent, UpdateAsistenciaDialogComponent],
	imports: [
		CommonModule,
		AsistenciasRoutingModule,
		GenericModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
	],
})
export class AsistenciasModule {}

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

@NgModule({
	declarations: [IndexComponent, ListComponent, CreateComponent, CedulaPipe, TelefonoPipe, PicturesDialogComponent],
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

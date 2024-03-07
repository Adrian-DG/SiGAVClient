import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadesRoutingModule } from './unidades-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { GenericModule } from '../generic/generic.module';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './pages/list/list.component';
import { CreateComponent } from './pages/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './pages/edit/edit.component';
import { ReassignUnidadDialogComponent } from './components/reassign-unidad-dialog/reassign-unidad-dialog.component';

@NgModule({
	declarations: [IndexComponent, ListComponent, CreateComponent, EditComponent, ReassignUnidadDialogComponent],
	imports: [
		CommonModule,
		UnidadesRoutingModule,
		GenericModule,
		MaterialModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
	],
})
export class UnidadesModule {}

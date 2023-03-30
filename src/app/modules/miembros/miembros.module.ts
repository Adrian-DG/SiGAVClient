import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiembrosRoutingModule } from './miembros-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { ListComponent } from './pages/list/list.component';
import { CreateComponent } from './pages/create/create.component';
import { MaterialModule } from '../material/material.module';
import { GenericModule } from '../generic/generic.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [IndexComponent, ListComponent, CreateComponent],
	imports: [
		CommonModule,
		MiembrosRoutingModule,
		MaterialModule,
		GenericModule,
		ReactiveFormsModule,
		FormsModule,
	],
})
export class MiembrosModule {}

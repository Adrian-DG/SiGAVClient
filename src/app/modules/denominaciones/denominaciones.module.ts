import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DenominacionesRoutingModule } from './denominaciones-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { ListComponent } from './pages/list/list.component';
import { CreateComponent } from './pages/create/create.component';
import { GenericModule } from '../generic/generic.module';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [IndexComponent, ListComponent, CreateComponent],
	imports: [
		CommonModule,
		DenominacionesRoutingModule,
		GenericModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
	],
})
export class DenominacionesModule {}

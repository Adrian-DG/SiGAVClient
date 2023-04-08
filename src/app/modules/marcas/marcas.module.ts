import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcasRoutingModule } from './marcas-routing.module';
import { MaterialModule } from '../material/material.module';
import { GenericModule } from '../generic/generic.module';
import { IndexComponent } from './pages/index/index.component';
import { ListComponent } from './pages/list/list.component';
import { CreateComponent } from './pages/create/create.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
	declarations: [IndexComponent, ListComponent, CreateComponent],
	imports: [
		CommonModule,
		MarcasRoutingModule,
		MaterialModule,
		GenericModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
	],
})
export class MarcasModule {}

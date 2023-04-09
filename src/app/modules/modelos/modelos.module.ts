import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelosRoutingModule } from './modelos-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { MaterialModule } from '../material/material.module';
import { GenericModule } from '../generic/generic.module';
import { CreateComponent } from './pages/create/create.component';
import { ListComponent } from './pages/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [IndexComponent, CreateComponent, ListComponent],
	imports: [
		CommonModule,
		ModelosRoutingModule,
		MaterialModule,
		GenericModule,
		ReactiveFormsModule,
		FormsModule,
	],
})
export class ModelosModule {}

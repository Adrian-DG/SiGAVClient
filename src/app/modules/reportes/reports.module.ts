import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericModule } from '../generic/generic.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { MaterialModule } from '../material/material.module';
import { IndexComponent } from './pages/index/index.component';

@NgModule({
	declarations: [IndexComponent],
	imports: [
		CommonModule,
		ReportsRoutingModule,
		MaterialModule,
		GenericModule,
	],
})
export class ReportsModule {}

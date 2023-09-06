import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericModule } from '../generic/generic.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { MaterialModule } from '../material/material.module';
import { IndexComponent } from './pages/index/index.component';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { DinamycChartComponent } from './components/dinamyc-chart/dinamyc-chart.component';

@NgModule({
	declarations: [IndexComponent, DinamycChartComponent],
	imports: [
		CommonModule,
		ReportsRoutingModule,
		MaterialModule,
		GenericModule,
		FormsModule,
		NgChartsModule,
	],
})
export class ReportsModule {}

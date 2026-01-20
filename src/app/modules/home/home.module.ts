import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsModule } from '../reportes/reports.module';
import { NgChartsModule } from 'ng2-charts';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material/material.module';
import { IndexPage } from './pages/index/index.page';
import { ReportsService } from '../reportes/services/reports.service';
import { DinamycChartComponent } from '../reportes/components/dinamyc-chart/dinamyc-chart.component';

@NgModule({
	declarations: [IndexPage],
	imports: [
		CommonModule,
		HomeRoutingModule,
		MaterialModule,
		ReportsModule,
		NgChartsModule,
	],
	providers: [ReportsService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}

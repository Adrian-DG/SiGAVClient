import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { IndexComponent } from './pages/index/index.component';

@NgModule({
	declarations: [IndexComponent],
	imports: [CommonModule, ReportsRoutingModule],
})
export class ReportsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreHospitalariaRoutingModule } from './pre-hospitalaria-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { MaterialModule } from '../material/material.module';
import { GenericModule } from '../generic/generic.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './pages/list/list.component';
import { CreateComponent } from './pages/create/create.component';
import { ReportModalComponent } from './components/report-modal/report-modal.component';
import { DetailsModalComponent } from './components/details-modal/details-modal.component';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';

@NgModule({
	declarations: [IndexComponent, ListComponent, CreateComponent, ReportModalComponent, DetailsModalComponent, EditModalComponent],
	imports: [
		CommonModule,
		PreHospitalariaRoutingModule,
		GenericModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
	],
})
export class PreHospitalariaModule {}

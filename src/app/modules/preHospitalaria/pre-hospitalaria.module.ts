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

@NgModule({
	declarations: [IndexComponent, ListComponent, CreateComponent],
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

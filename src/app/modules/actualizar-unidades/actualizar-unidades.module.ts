import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualizarUnidadesRoutingModule } from './actualizar-unidades-routing.module';
import { IndexPage } from './pages/index/index.page';
import { MaterialModule } from '../material/material.module';
import { GenericModule } from '../generic/generic.module';

@NgModule({
	declarations: [IndexPage],
	imports: [
		CommonModule,
		ActualizarUnidadesRoutingModule,
		MaterialModule,
		GenericModule,
	],
})
export class ActualizarUnidadesModule {}

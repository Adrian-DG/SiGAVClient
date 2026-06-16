import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusquedaAvanzadaRoutingModule } from './busqueda-avanzada-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { GenericModule } from '../generic/generic.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { AsistenciasService } from '../asistencias/services/asistencias.service';
import { CedulaPipe } from '../asistencias/pipes/cedula.pipe';

@NgModule({
	declarations: [IndexComponent],
	imports: [
		CommonModule,
		FormsModule,
		BusquedaAvanzadaRoutingModule,
		GenericModule,
		MaterialModule,
	],
	providers: [AsistenciasService],
})
export class BusquedaAvanzadaModule {}

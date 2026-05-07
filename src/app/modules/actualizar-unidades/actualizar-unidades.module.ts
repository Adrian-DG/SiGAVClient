import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualizarUnidadesRoutingModule } from './actualizar-unidades-routing.module';
import { IndexPage } from './pages/index/index.page';

@NgModule({
	declarations: [IndexPage],
	imports: [CommonModule, ActualizarUnidadesRoutingModule],
})
export class ActualizarUnidadesModule {}

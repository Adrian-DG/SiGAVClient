import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcasRoutingModule } from './marcas-routing.module';
import { MaterialModule } from '../material/material.module';
import { GenericModule } from '../generic/generic.module';
import { IndexComponent } from './pages/index/index.component';
import { ListComponent } from './pages/list/list.component';
import { CreateComponent } from './pages/create/create.component';

@NgModule({
	declarations: [
    IndexComponent,
    ListComponent,
    CreateComponent
  ],
	imports: [CommonModule, MarcasRoutingModule, MaterialModule, GenericModule],
})
export class MarcasModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TramosRoutingModule } from './tramos-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { GenericModule } from '../generic/generic.module';
import { MaterialModule } from '../material/material.module';
import { ListComponent } from './pages/list/list.component';
import { CreateComponent } from './pages/create/create.component';

@NgModule({
	declarations: [IndexComponent, ListComponent, CreateComponent],
	imports: [CommonModule, TramosRoutingModule, GenericModule, MaterialModule],
})
export class TramosModule {}

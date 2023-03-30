import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { ListComponent } from './pages/list/list.component';
import { CreateComponent } from './pages/create/create.component';


@NgModule({
  declarations: [
    IndexComponent,
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }

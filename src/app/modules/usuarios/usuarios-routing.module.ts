import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './pages/create/create.component';
import { IndexComponent } from './pages/index/index.component';
import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
	{
		path: '',
		component: IndexComponent,
		children: [
			{ path: 'listado', component: ListComponent },
			{ path: 'crear', component: CreateComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UsuariosRoutingModule {}

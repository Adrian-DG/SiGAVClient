import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './pages/create/create.component';
import { IndexComponent } from './pages/index/index.component';
import { ListComponent } from './pages/list/list.component';
import { EditComponent } from './pages/edit/edit.component';

const routes: Routes = [
	{
		path: '',
		component: IndexComponent,
		children: [
			{ path: 'listado', component: ListComponent },
			{ path: 'crear', component: CreateComponent },
			{ path: 'editar/:id', component: EditComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MiembrosRoutingModule {}

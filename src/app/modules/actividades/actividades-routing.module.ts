import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';

const routes: Routes = [
	{
		path: 'calendario',
		component: IndexComponent,
	},
	{
		path: '',
		redirectTo: 'calendario',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ActividadesRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { AuthModule } from './modules/auth/auth.module';

const routes: Routes = [
	{
		path: 'asistencias',
		loadChildren: () =>
			import('./modules/asistencias/asistencias.module').then(
				(m) => m.AsistenciasModule
			),
		canActivate: [AuthGuard],
	},
	{
		path: 'unidades',
		loadChildren: () =>
			import('./modules/unidades/unidades.module').then(
				(m) => m.UnidadesModule
			),
		canActivate: [AuthGuard],
	},
	{
		path: 'tramos',
		loadChildren: () =>
			import('./modules/tramos/tramos.module').then(
				(m) => m.TramosModule
			),
		canActivate: [AuthGuard],
	},
	{
		path: 'auth',
		loadChildren: () =>
			import('./modules/auth/auth.module').then((m) => m.AuthModule),
	},
	{ path: '', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

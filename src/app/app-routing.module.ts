import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
	{
		path: 'marcas',
		loadChildren: () =>
			import('./modules/marcas/marcas.module').then(
				(m) => m.MarcasModule
			),
		canActivate: [AuthGuard],
	},
	{
		path: 'usuarios',
		loadChildren: () =>
			import('./modules/usuarios/usuarios.module').then(
				(m) => m.UsuariosModule
			),
		canActivate: [AuthGuard],
	},
	{
		path: 'miembros',
		loadChildren: () =>
			import('./modules/miembros/miembros.module').then(
				(m) => m.MiembrosModule
			),
		canActivate: [AuthGuard],
	},
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

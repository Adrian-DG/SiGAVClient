import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { IUsuarioPermisoViewModel } from '../../viewModels/iusuario-permiso-view-model';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, AfterViewInit {
	user!: IUsuarioPermisoViewModel;
	usuarioForm!: FormGroup;

	constructor(
		private $fb: FormBuilder,
		private _usuarios: UsuarioService,
		private $activeRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		const usuarioId: number = this.$activeRoute.snapshot.params['id'];
		this._usuarios
			.getUsuarioDetalles(usuarioId)
			.subscribe((data: IUsuarioPermisoViewModel) => (this.user = data));
	}

	ngAfterViewInit(): void {}

	onSubmit() {}
}

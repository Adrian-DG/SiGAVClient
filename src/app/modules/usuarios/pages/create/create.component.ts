import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
	constructor(private _usuarios: UsuarioService, private $fb: FormBuilder) {}

	usuarioForm: FormGroup = this.$fb.group({
		cedula: ['', [Validators.required]],
		nombre: ['', [Validators.required]],
		apellido: ['', [Validators.required]],
		fechaNacimiento: [''],
		genero: [0],
		username: ['', [Validators.required]],
		password: ['', [Validators.required, Validators.minLength(6)]],
		esAdministrador: [false],
	});

	onSubmit(): void {
		this._usuarios.createUsuario(this.usuarioForm.value);
	}
}

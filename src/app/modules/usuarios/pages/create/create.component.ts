import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { IUsuario } from '../../entities/iusuario';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
	constructor(private _usuarios: UsuarioService, private $fb: FormBuilder) {}

	usuarioForm: FormGroup = this.$fb.group({
		cedula: [''],
		nombre: [''],
		apellido: [''],
		fechaNacimiento: [''],
		genero: [0],
		username: ['', [Validators.required]],
		password: ['', [Validators.required, Validators.minLength(6)]],
		esAdministrador: [false],
		rolUsuario: [0],
	});

	onSubmit(): void {
		const fecha = Date.now();
		const { username, password, genero, esAdministrador, rolUsuario } =
			this.usuarioForm.value;
		const usuario: IUsuario = {
			cedula: '',
			nombre: '',
			apellido: '',
			fechaNacimiento: new Date(fecha),
			fechaCreacion: new Date(fecha),
			fechaModificacion: new Date(fecha),
			genero: genero,
			username: username,
			password: password,
			esAdministrador: esAdministrador,
			estatus: false,
			rolUsuario: rolUsuario,
		};
		this._usuarios.createUsuario(usuario);
	}
}

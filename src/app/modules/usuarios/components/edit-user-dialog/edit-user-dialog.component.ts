import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUsuarioViewModel } from '../../viewModels/iusuario-view-model';
import { UsuarioService } from '../../services/usuario.service';
import { IUsuario } from '../../entities/iusuario';

@Component({
	selector: 'app-edit-user-dialog',
	templateUrl: './edit-user-dialog.component.html',
	styleUrls: ['./edit-user-dialog.component.scss'],
})
export class EditUserDialogComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: IUsuarioViewModel,
		private _usuarios: UsuarioService
	) {}

	saveChanges(): void {
		let rol = 0;

		switch (this.data.tipoUsuario) {
			case 'Analista_Operaciones':
				rol = 1;
				break;
			case 'Gestion_Operativa':
				rol = 2;
				break;
			default:
				rol = 3;
				break;
		}

		const editedUser: IUsuario = {
			id: this.data.id,
			cedula: this.data.cedula,
			nombre: '',
			apellido: '',
			esAdministrador: rol == 1 ? true : false,
			estatus: true,
			rolUsuario: rol,
			password: '',
			fechaCreacion: new Date(),
			fechaModificacion: new Date(),
			genero: 0,
			username: this.data.nombreUsuario,
			fechaNacimiento: new Date(),
		};

		this._usuarios.Update(editedUser);
	}
}

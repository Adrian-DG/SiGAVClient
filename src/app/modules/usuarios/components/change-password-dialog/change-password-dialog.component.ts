import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangePasswordDTO } from '../../DTO/change-password-dto';
import { UsuarioService } from '../../services/usuario.service';
import { UserPasswordInfo } from '../../DTO/user-password-info';

@Component({
	selector: 'app-change-password-dialog',
	templateUrl: './change-password-dialog.component.html',
	styleUrls: ['./change-password-dialog.component.scss'],
})
export class ChangePasswordDialogComponent {
	credentials: ChangePasswordDTO = {
		userId: 0,
		newPassword: '',
	};

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: UserPasswordInfo,
		private _usuarios: UsuarioService
	) {}

	saveChanges(): void {
		this.credentials.userId = this.data.userId;
		this._usuarios.ChangePassword(this.credentials);
	}
}

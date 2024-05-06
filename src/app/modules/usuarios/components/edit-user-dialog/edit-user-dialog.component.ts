import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUsuarioViewModel } from '../../viewModels/iusuario-view-model';
import { UsuarioService } from '../../services/usuario.service';
import { IUsuario } from '../../entities/iusuario';
import { BehaviorSubject, firstValueFrom, lastValueFrom } from 'rxjs';
import { CacheService } from 'src/app/modules/generic/services/cache/cache.service';
import { IUsuarioEditViewModel } from '../../viewModels/iusuario-edit-view-model';
import { EditUserDto } from '../../DTO/edit-user-dto';
import { IServerResponse } from 'src/app/modules/generic/Responses/iserver-response';

@Component({
	selector: 'app-edit-user-dialog',
	templateUrl: './edit-user-dialog.component.html',
	styleUrls: ['./edit-user-dialog.component.scss'],
})
export class EditUserDialogComponent implements OnInit, AfterViewInit {
	usuarioSource = new BehaviorSubject<IUsuarioEditViewModel | null>(null);
	usuario$ = this.usuarioSource.asObservable();

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { id: number },
		public _dialogRef: MatDialogRef<EditUserDialogComponent>,
		private _usuarios: UsuarioService,
		public _cache: CacheService
	) {}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this._usuarios
			.GetEditUsuarioViewModel(this.data.id)
			.subscribe((data: IUsuarioEditViewModel) =>
				this.usuarioSource.next(data)
			);
	}

	async saveChanges(): Promise<void> {
		const model = await firstValueFrom<IUsuarioEditViewModel | null>(
			this.usuario$
		);

		console.log(model);

		if (model) {
			const editUserDto: EditUserDto = {
				id: model?.id ?? 0,
				nombre: model?.nombre ?? '',
				apellido: model?.apellido ?? '',
				cedula: model?.cedula ?? '',
				genero: model?.genero ?? 0,
				esAdministrador: model?.esAdministrador ?? false,
				rolUsuario: model?.rolUsuario ?? 2,
			};

			this._usuarios
				.EditUser(editUserDto)
				.subscribe((response: IServerResponse) => {
					if (response.status) {
						this._dialogRef.close();
					}
					alert(response.message);
				});
		}
	}
}

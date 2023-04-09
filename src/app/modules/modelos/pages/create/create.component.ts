import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModeloService } from '../../services/modelo.service';
import { IModelo } from '../../entities/imodelo';
import { CacheService } from 'src/app/modules/generic/services/cache/cache.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
	constructor(
		private $fb: FormBuilder,
		private _modelos: ModeloService,
		public _cache: CacheService
	) {}

	modeloForm: FormGroup = this.$fb.group({
		nombre: ['', [Validators.required]],
		vehiculoMarcaId: [0],
		vehiculoTipoId: [0],
	});

	create(): void {
		this._modelos.Post<IModelo>(this.modeloForm.value);
	}
}

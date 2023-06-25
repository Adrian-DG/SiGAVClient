import { Component } from '@angular/core';
import { MarcasService } from '../../services/marcas.service';
import { INombreModelMetadata } from 'src/app/modules/generic/abstraction/inombre-model-metadata';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
	nombre: string = '';

	constructor(private _marcas: MarcasService) {}

	create(): void {
		const model: INombreModelMetadata = {
			nombre: this.nombre,
			estatus: true,
			fechaCreacion: new Date(),
			fechaModificacion: new Date(),
		};
		this._marcas.PostConfirm<INombreModelMetadata>(model);
	}
}

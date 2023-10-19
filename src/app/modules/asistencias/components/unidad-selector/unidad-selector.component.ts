import { Component, Input } from '@angular/core';
import { IUnidadAutoComplete } from 'src/app/modules/unidades/viewModels/iunidad-auto-complete';

@Component({
	selector: 'app-unidad-selector',
	templateUrl: './unidad-selector.component.html',
	styleUrls: ['./unidad-selector.component.scss'],
})
export class UnidadSelectorComponent {
	@Input() item!: IUnidadAutoComplete;
}

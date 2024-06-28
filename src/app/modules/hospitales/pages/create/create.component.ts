import { Component } from '@angular/core';
import { IHospitalCreateDto } from '../../interfaces/ihospital-create.dto';
import { HospitalesService } from '../../services/hospitales.service';
import { IServerResponse } from 'src/app/modules/generic/Responses/iserver-response';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
	hospitalObj: IHospitalCreateDto = {
		nombre: '',
		region: 0,
	};

	constructor(private _hospital: HospitalesService) {}

	get isHospitalValid() {
		return (
			this.hospitalObj.nombre.length > 2 &&
			this.hospitalObj.nombre !== ' '
		);
	}

	create() {
		this._hospital
			.create(this.hospitalObj)
			.subscribe((data: IServerResponse) => alert(data.message));
	}
}

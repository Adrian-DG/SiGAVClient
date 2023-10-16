import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CacheService } from 'src/app/modules/generic/services/cache/cache.service';
import { ICreateMiembro } from '../../DTO/icreate-miembro';
import { IMiembro } from '../../entities/imiembro';
import { MiembroService } from '../../services/miembro.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
	constructor(
		private _miembros: MiembroService,
		private $fb: FormBuilder,
		public _cache: CacheService
	) {}

	miembroForm: FormGroup = this.$fb.group({
		cedula: [
			'',
			[
				Validators.required,
				Validators.minLength(11),
				Validators.pattern(/^\d{11}$/),
			],
		],
		nombre: ['', [Validators.required]],
		apellido: ['', [Validators.required]],
		fechaNacimiento: [''],
		genero: [0],
		rangoId: [0],
		institucion: [0],
		perteneceA: [0],
		accesoTotal: [false],
	});

	ngOnInit(): void {
		this._cache.getData('rangos');
	}

	onSubmit(): void {
		const {
			cedula,
			nombre,
			apellido,
			fechaNacimiento,
			genero,
			rangoId,
			institucion,
			perteneceA,
			accesoTotal,
		} = this.miembroForm.value;

		const fecha = Date.now();

		const miembro: ICreateMiembro = {
			cedula: cedula,
			nombre: nombre,
			apellido: apellido,
			fechaCreacion: new Date(fecha),
			genero: genero,
			rangoId: rangoId,
			institucion: institucion,
			perteneceA: perteneceA,
			accesoTotal: accesoTotal,
		};

		this._miembros.createMiembro(miembro);
	}
}

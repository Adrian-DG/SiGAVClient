import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CacheService } from 'src/app/modules/generic/services/cache/cache.service';
import { TramoService } from '../../services/tramo.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
	constructor(
		private $fb: FormBuilder,
		private _tramo: TramoService,
		public _cache: CacheService
	) {}

	tramoForm: FormGroup = this.$fb.group({
		nombre: ['', [Validators.required]],
		regionAsistenciaId: [0, [Validators.required]],
	});

	ngOnInit(): void {
		this.getRegion();
	}

	createTramo(): void {
		this._tramo.Post(this.tramoForm.value);
	}

	getRegion(): void {
		this._cache.getData('regiones');
	}
}

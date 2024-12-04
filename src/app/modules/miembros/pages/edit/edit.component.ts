import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MiembroService } from '../../services/miembro.service';
import { CacheService } from 'src/app/modules/generic/services/cache/cache.service';
import { IMiembro } from '../../entities/imiembro';
import { IServerResponse } from 'src/app/modules/generic/Responses/iserver-response';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, AfterViewInit {
	private id!: number;
	public miembro!: IMiembro;
	constructor(
		private $location: Location,
		private $activeRoute: ActivatedRoute,
		private _miembros: MiembroService,
		public _cache: CacheService,
		public $router: Router
	) {}

	ngOnInit(): void {
		this.id = this.$activeRoute.snapshot.params['id'];
		this._cache.getData('rangos');
	}

	ngAfterViewInit(): void {
		this._miembros
			.GetById<IMiembro>(this.id)
			.subscribe((data: IMiembro) => (this.miembro = data));
	}

	cancel(): void {
		this.$location.back();
	}

	saveChanges(): void {
		this._miembros.showSpinner();
		this._miembros
			.UpdateMiembro(this.id, this.miembro)
			.subscribe((response: IServerResponse) => {
				if (response.status) {
					alert('Se han guardado los cambios');
				}
			});
	}
}

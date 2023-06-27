import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MiembroService } from '../../services/miembro.service';
import { CacheService } from 'src/app/modules/generic/services/cache/cache.service';
import { IMiembro } from '../../entities/imiembro';

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
		public _cache: CacheService
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
		this._miembros.Update(this.miembro);
	}
}

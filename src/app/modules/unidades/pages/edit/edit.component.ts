import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnidadesService } from '../../services/unidades.service';
import { IUnidad } from '../../entities/iunidad';
import { CacheService } from 'src/app/modules/generic/services/cache/cache.service';
import { TramoService } from 'src/app/modules/tramos/services/tramo.service';
import { ITramoViewModel } from 'src/app/modules/tramos/viewModels/itramo-view-model';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, AfterViewInit {
	private id!: number;
	public tramosFilteredList!: ITramoViewModel[];
	public unidad!: IUnidad | undefined;

	constructor(
		private $router: Router,
		private $activeRoute: ActivatedRoute,
		public _cache: CacheService,
		public _tramos: TramoService,
		private _unidad: UnidadesService
	) {}

	ngOnInit(): void {
		this.id = this.$activeRoute.snapshot.params['id'];
		this._tramos
			.getFilteredTramosByNombre()
			.subscribe(
				(data: ITramoViewModel[]) => (this.tramosFilteredList = data)
			);
	}

	ngAfterViewInit(): void {
		this._unidad.GetById<IUnidad>(this.id).subscribe((data: IUnidad) => {
			console.log('unidad: ', data);
			this.unidad = data;
		});
	}

	saveChanges(): void {
		this._unidad.Update(this.unidad);
	}
}

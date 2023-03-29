import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IGenericData } from '../../Responses/igeneric-data';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment as Prod } from 'src/environment/environment.prod';
import { environment as Dev } from 'src/environment/environment';

@Injectable({
	providedIn: 'root',
})
export class CacheService {
	private endPoint: string = '';

	private vehiculoTiposSource = new BehaviorSubject<IGenericData[]>([]);
	public vehiculoTipos$ = this.vehiculoTiposSource.asObservable();

	private vehiculoColoresSource = new BehaviorSubject<IGenericData[]>([]);
	public vehiculoColor$ = this.vehiculoColoresSource.asObservable();

	private vehiculoMarcaSource = new BehaviorSubject<IGenericData[]>([]);
	public vehiculoMarca$ = this.vehiculoMarcaSource.asObservable();

	private vehiculoModeloSource = new BehaviorSubject<IGenericData[]>([]);
	public vehiculoModelo$ = this.vehiculoModeloSource.asObservable();

	private provinciaSource = new BehaviorSubject<IGenericData[]>([]);
	public provincias$ = this.provinciaSource.asObservable();

	private municipiosSource = new BehaviorSubject<IGenericData[]>([]);
	public municipios$ = this.municipiosSource.asObservable();

	private tipoAsistenciaSource = new BehaviorSubject<IGenericData[]>([]);
	public tipoAsistencia$ = this.tipoAsistenciaSource.asObservable();

	private regionesAsistenciaSource = new BehaviorSubject<IGenericData[]>([]);
	public regionesAsistencia$ = this.regionesAsistenciaSource.asObservable();

	private tipoUnidadesSource = new BehaviorSubject<IGenericData[]>([]);
	public tipoUnidades$ = this.tipoUnidadesSource.asObservable();

	private readonly sources = {
		VehiculoTipo: (value: IGenericData[]) =>
			this.vehiculoTiposSource.next(value),
		VehiculoColores: (value: IGenericData[]) =>
			this.vehiculoColoresSource.next(value),
		VehiculoMarca: (value: IGenericData[]) =>
			this.vehiculoMarcaSource.next(value),
		VehiculoModelo: (value: IGenericData[]) =>
			this.vehiculoModeloSource.next(value),
		provincias: (value: IGenericData[]) => this.provinciaSource.next(value),
		municipios: (value: IGenericData[]) =>
			this.municipiosSource.next(value),
		TipoAsistencia: (value: IGenericData[]) =>
			this.tipoAsistenciaSource.next(value),
		regiones: (value: IGenericData[]) =>
			this.regionesAsistenciaSource.next(value),
		TipoUnidades: (value: IGenericData[]) =>
			this.tipoUnidadesSource.next(value),
	};

	constructor(private $http: HttpClient) {
		const env: string = isDevMode() ? Dev.api_url : Prod.api_url;
		this.endPoint += `${env}/Cache`;
	}

	getData(resource: string): void {
		const sourcesKeys = Object.entries(this.sources);
		this.$http
			.get<IGenericData[]>(`${this.endPoint}/${resource}`)
			.subscribe((data: IGenericData[]) => {
				const key = sourcesKeys.findIndex((x) => x[0] == resource);
				sourcesKeys[key][1](data);
			});
	}

	getDataOnId(resource: string, id: number): void {
		const params = new HttpParams().set('id', id);
		const sourcesKeys = Object.entries(this.sources);
		this.$http
			.get<IGenericData[]>(`${this.endPoint}/${resource}`, {
				params: params,
			})
			.subscribe((data: IGenericData[]) => {
				const key = sourcesKeys.findIndex((x) => x[0] == resource);
				sourcesKeys[key][1](data);
			});
	}
}

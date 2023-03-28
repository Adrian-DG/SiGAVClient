import { IModelMetadata } from '../../generic/abstraction/imodel-metadata';

export interface IUnidad extends IModelMetadata {
	denominacion: string;
	ficha: string;
	placa: string;
	puntosAsignado: string;
	cobertura: string;
	tipoUnidadId: number;
	tramoId: number;
}

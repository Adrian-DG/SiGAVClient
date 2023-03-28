import { IModelMetadata } from '../../generic/abstraction/imodel-metadata';

export interface ITramo extends IModelMetadata {
	nombre: string;
	regionAsistenciaId: number;
}

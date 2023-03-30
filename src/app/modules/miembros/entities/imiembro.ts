import { IModelMetadata } from '../../generic/abstraction/imodel-metadata';
import { IPersonModelMetadata } from '../../generic/abstraction/iperson-model-metadata';
import { Institucion } from '../../generic/enums/institucion';

export interface IMiembro extends IPersonModelMetadata {
	rangoId: number;
	institucion: number;
}

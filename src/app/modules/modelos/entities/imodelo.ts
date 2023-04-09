import { INombreModelMetadata } from '../../generic/abstraction/inombre-model-metadata';

export interface IModelo extends INombreModelMetadata {
	vehiculoMarcaId: number;
	vehiculoTipoId: number;
}

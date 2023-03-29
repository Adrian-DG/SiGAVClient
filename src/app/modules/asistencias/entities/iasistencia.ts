import { IModelMetadata } from '../../generic/abstraction/imodel-metadata';

export interface IAsistencia extends IModelMetadata {
	identificacion: string;
	nombre: string;
	apellido: string;
	telefono: string;
	genero: string;
	placa: string;
	vehiculoTipoId: number;
	vehiculoColorId: number;
	vehiculoModeloId: number;
	vehiculoMarcaId: number;
	coordenadas: string;
	municipioId: number;
	provinciaId: number;
	unidadMiembroId: number;
	estatusAsistencia: number;
	reportadoPor: number;
	comentarios: string;
}

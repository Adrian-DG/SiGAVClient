import { IEncuestaCalidad } from './iencuesta-calidad';

export interface IAsistenciaCalidadCreate {
	asistenciaId: number;
	usuarioId: number;
	encuesta: IEncuestaCalidad;
	fueContactado: boolean;
}

import { IEncuestaCalidad } from './iencuesta-calidad';

export interface IAsistenciaCalidadViewModel {
	id: number;
	usuario: string;
	fueContactado: boolean;
	encuesta: IEncuestaCalidad;
}

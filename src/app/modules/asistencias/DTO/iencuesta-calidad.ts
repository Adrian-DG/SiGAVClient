import { IPreguntaEncuestaCalidad } from './ipregunta-encuesta-calidad';

export interface IEncuestaCalidad {
	pregunta1: IPreguntaEncuestaCalidad;
	pregunta2: IPreguntaEncuestaCalidad;
	pregunta3: boolean;
	pregunta4: boolean;
	pregunta5: boolean;
	pregunta6: string;
}

import { ITipoAsistenciaViewModel } from './itipo-asistencia-view-model';

export interface IAsistenciaViewModel {
	id: number;
	identificacion: string;
	nombreCiudadano: string;
	telefono: string;
	genero: string;
	esExtranjero: boolean;
	vehiculoTipo: string;
	vehiculoColor: string;
	vehiculoModelo: string;
	vehiculoMarca: string;
	coordenadas: string;
	municipio: string;
	provincia: string;
	tramo: string;
	fichaUnidad: string;
	denominacionUnidad: string;
	tipoUnidad: string;
	cedulaAgente: string;
	nombreAgente: string;
	rangoAgente: string;
	tipoAsistencias: ITipoAsistenciaViewModel[];
	comentario: string;
	fechaCreacion: Date;
	estatusAsistencia: number;
}
import { ISignosVitales } from './isignos-vitales';

export interface IAsistenciaPreHospitalariaDetails {
	identificacion: string;
	nombre: string;
	apellido: string;
	sexo: string;
	edad: number;
	telefono: string;
	nacionalidadId: number;
	personaDesconocida: boolean;
	esEventoCampo: boolean;
	esEventoEspecial: boolean;
	nombreEventoEspecial: string;
	esTraslado: boolean;
	apoyoBrindado: number;
	despachadaPor: number;
	tipoAsistencia: number;
	tipoCausa: number;
	tipoCausaTraslado: number;
	medicoId: number;
	reguladorId: number;
	denominacionId: number;
	procedimientosRealizados: string;
	detalleAsistencia: string;
	signosVitales: ISignosVitales;
	hallazgoPositivo: string;
	diagnosticoPresuntivo: string;
	insumosUtilizados: string;
}

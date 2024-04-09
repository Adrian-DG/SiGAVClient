import { ISignosVitales } from './isignos-vitales';

export interface IAsistenciaPreHospitalariaDetails {
	detalleAsistencia: string;
	diagnosticoPresuntivo: string;
	insumosUtilizados: string;
	procedimientosRealizados: string;
	signosVitales: ISignosVitales;
	hallazgoPositivo: string;
}

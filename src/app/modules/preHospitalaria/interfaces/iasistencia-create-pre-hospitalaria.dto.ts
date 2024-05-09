export interface IAsistenciaCreatePreHospitalariaDto {
	// Ciudadano

	identificacion: string;
	nombre: string;
	apellido: string;
	sexo: number;
	edad: number;
	telefono: string;
	personaDesconocida: boolean;
	nacionalidadId: number;

	// Asistencia

	tipoAsistencia: number;
	tipoCausa: number;
	esTraslado: boolean;
	causaTraslado: number;
	despachadaPor: number;
	apoyoBrindado: number;
	esEventoCampo: boolean;
	esEventoEspecial: boolean;
	nombreEventoEspecial: string;

	// Ubicacion

	zona: number;
	provinciaId: number;
	municipioId: number;
	unidadMiembroId: number;
	hospitalId: number;
	personaRecibioEnHospital: string;

	// data asistencia

	antecedentesMorbidos: string;
	detalleAsistencia: string;
	frecuenciaCardiaca: number;
	frecuenciaRespiratoria: number;
	tensionArterialSistolica: number;
	tensionArterialDiastolica: number;
	saturacionParcialOxigeno: number;
	temperatura: number;

	llenadoCapilar: number;
	aperturaOcular: number;
	respuestaVerbal: number;
	respuestaMotora: number;

	hallazgoPositivo: string;
	diagnosticoPresuntivo: string;
	procedimientosRealizados: string;
	insumosUtilizados: string;

	medicoId: number;
	componente1Id: number;
	componente2Id: number;
	reguladorEmergenciaId: number;
}

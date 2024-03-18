export interface IAsisteciaPreHospitalariaViewModel {
	id: number;
	identificacion: string;
	nombreCompleto: string;
	edad: number;
	sexo: string;
	telefono: string;
	nacionalidad: string;
	provincia: string;
	municipio: string;
	denominacion: string;
	ficha: string;
	fechaCreacion: Date;
	zona: string;
	tipoAsistencia: string;
	tipoCausa: string;
	causaTraslado: string;
	apoyoBrindado: string;
}

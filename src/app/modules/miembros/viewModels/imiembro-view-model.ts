export interface IMiembroViewModel {
	id: number;
	cedula: string;
	nombreCompleto: string;
	rango: string;
	institucion: string;
	estatus: boolean;
	autorizado: boolean;
	fechaCreacion: Date;
	usuarioId: number;
	perteneceA: string;
}

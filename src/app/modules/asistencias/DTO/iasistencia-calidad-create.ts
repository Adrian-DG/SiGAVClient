export interface IAsistenciaCalidadCreate {
	asistenciaId: number;
	usuarioId: number;
	valoracion: number;
	comentario: string;
	fueContactado: boolean;
}

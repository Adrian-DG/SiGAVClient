export interface IAsistenciaR5Create {
	// ciudadano
	identificacion: string;
	nombre: string;
	apellido: string;
	telefono: string;
	genero: number;
	esExtranjero: boolean;
	// vehiculo
	vehiculoMarcaId: number;
	vehiculoModeloId: number;
	vehiculoTipoId: number;
	vehiculoColorId: number;
	placa: string;

	// ubicacion
	provinciaId: number;
	municipioId: number;
	unidadId: number;
	tipoAsistencias: number[];

	comentario: string;
	usuarioId: number;
}

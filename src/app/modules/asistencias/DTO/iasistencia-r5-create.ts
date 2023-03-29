export interface IAsistenciaR5Create {
	// ciudadano
	identificacion: string;
	nombreCiudadano: string;
	telefono: string;
	edad: number;
	// vehiculo
	vehiculoMarcaId: number;
	vehiculoModeloId: number;
	vehiculoTipoId: number;
	vehiculoColorId: number;
	// ubicacion
	provinciaId: number;
	municipioId: number;
	unidadId: number;
	tipoAsistenciaId: number;
}

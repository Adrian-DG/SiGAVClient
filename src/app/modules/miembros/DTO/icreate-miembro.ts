export interface ICreateMiembro {
	cedula: string;
	nombre: string;
	apellido: string;
	fechaCreacion: Date;
	genero: number;
	rangoId: number;
	institucion: number;
	perteneceA: number;
	accesoTotal: boolean;
}

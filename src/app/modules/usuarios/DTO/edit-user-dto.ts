export interface EditUserDto {
	id: number;
	cedula: string;
	nombre: string;
	apellido: string;
	genero: number;
	rolUsuario: number;
	esAdministrador: boolean;
}

export interface EditUserDto {
	id: number;
	cedula: string;
	nombre: string;
	apellido: string;
	username: string;
	genero: number;
	rolUsuario: number;
	esAdministrador: boolean;
}

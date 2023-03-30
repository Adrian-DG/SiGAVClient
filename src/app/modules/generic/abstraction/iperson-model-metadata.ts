import { Genero } from '../enums/genero';
import { IModelMetadata } from './imodel-metadata';

export interface IPersonModelMetadata extends IModelMetadata {
	cedula: string;
	nombre: string;
	apellido: string;
	fechaNacimiento: Date;
	genero: number;
}

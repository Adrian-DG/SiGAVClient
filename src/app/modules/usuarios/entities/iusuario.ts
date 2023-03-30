import { IPersonModelMetadata } from '../../generic/abstraction/iperson-model-metadata';

export interface IUsuario extends IPersonModelMetadata {
	username: string;
	password: string;
	esAdministrador: boolean;
}

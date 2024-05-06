import { IPersonModelMetadata } from '../../generic/abstraction/iperson-model-metadata';

export interface IUsuarioEditViewModel extends IPersonModelMetadata {
	username: string;
	rolUsuario: number;
	esAdministrador: boolean;
}

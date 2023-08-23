import { IServerResponse } from '../../generic/Responses/iserver-response';

export interface ILoginResponse extends IServerResponse {
	usuarioId: number;
	usuario: string;
	token: string;
	esAdministrador: boolean;
	rolUsuario: number;
}

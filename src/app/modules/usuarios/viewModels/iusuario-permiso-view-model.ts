import { IPermisoViewModel } from './ipermiso-view-model';
import { IUsuarioViewModel } from './iusuario-view-model';
// TODO: Add usuario permiso model
export interface IUsuarioPermisoViewModel extends IUsuarioViewModel {
	permisos: IPermisoViewModel[];
}

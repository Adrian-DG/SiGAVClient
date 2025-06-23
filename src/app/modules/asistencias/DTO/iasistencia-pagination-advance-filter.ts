import { IAsistenciaPaginationFilter } from './iasistencia-pagination-filter';

export interface IAsistenciaPaginationAdvanceFilter
	extends IAsistenciaPaginationFilter {
	initialDate?: Date | null;
	finalDate?: Date | null;
	tipoBusqueda: number;
}

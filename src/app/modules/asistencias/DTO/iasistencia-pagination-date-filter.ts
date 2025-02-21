import { IAsistenciaPaginationFilter } from './iasistencia-pagination-filter';

export interface IAsistenciaPaginationDateFilter
	extends IAsistenciaPaginationFilter {
	isDateFilter: boolean;
	initialDate: Date;
	finalDate: Date;
	tipoBusqueda: number;
}

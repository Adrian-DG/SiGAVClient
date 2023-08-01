import { IPaginationFilters } from '../../generic/DTO/ipagination-filters';

export interface IAsistenciaPaginationFilter extends IPaginationFilters {
	estatusAsistencia: number;
}

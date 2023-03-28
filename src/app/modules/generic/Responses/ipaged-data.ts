export interface IPagedData<T> {
	page: number;
	size: number;
	items: T[];
	totalCount: number;
}

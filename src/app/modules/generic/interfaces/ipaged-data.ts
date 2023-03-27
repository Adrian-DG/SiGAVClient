export interface IPagedData<T> {
	page: number;
	size: number;
	item: T[];
	totalCount: number;
}

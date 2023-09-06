export interface IChartDataSetValues {
	label: string;
	data: number[];
}

export interface IChartDataSet {
	labels: string[];
	data: IChartDataSetValues[];
}

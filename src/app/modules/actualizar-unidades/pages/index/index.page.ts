import { Component } from '@angular/core';
import {
	ExcelTemplateType,
	IExcelUploadOption,
} from 'src/app/modules/generic/components/excel-upload/excel-upload.models';

@Component({
	selector: 'app-actualizar-unidades-index',
	templateUrl: './index.page.html',
	styleUrls: ['./index.page.scss'],
})
export class IndexPage {
	readonly uploadOptions: IExcelUploadOption[] = [
		{
			templateType: ExcelTemplateType.UnidadDenominacion,
			label: 'Unidades y Denominaciones',
			description:
				'Actualiza las unidades con su denominacion, tramo y tipo de unidad.',
			templateFileName: 'UnidadDenominacionTemplate.xlsx',
			expectedColumns: ['Ficha', 'Denominacion', 'Tramo', 'TipoUnidad'],
		},
		{
			templateType: ExcelTemplateType.Miembros,
			label: 'Miembros',
			description:
				'Crea o actualiza los miembros a partir de su cedula y rango.',
			templateFileName: 'MiembrosTemplate.xlsx',
			expectedColumns: [
				'Rango',
				'Profesion',
				'Cedula',
				'Nombre',
				'Apellido',
				'Estado',
			],
		},
	];
}

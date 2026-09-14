/**
 * Tipos de plantilla soportados por la API (deben coincidir con el enum
 * `ExcelTemplateType` del backend).
 */
export enum ExcelTemplateType {
	UnidadDenominacion = 'UnidadDenominacion',
	Miembros = 'Miembros',
}

/** Opcion de carga que se muestra al usuario en el selector. */
export interface IExcelUploadOption {
	/** Tipo de plantilla enviado a la API. */
	templateType: ExcelTemplateType | string;
	/** Texto visible en el selector. */
	label: string;
	/** Detalle opcional mostrado debajo del selector. */
	description?: string;
	/** Nombre con el que se guarda la plantilla descargada. */
	templateFileName?: string;
	/** Columnas que debe traer el archivo; se validan antes de enviarlo. */
	expectedColumns?: string[];
}

/** Respuesta estandar de los endpoints de carga. */
export interface IExcelUploadResponse {
	success: boolean;
	message: string;
	processedCount: number;
}

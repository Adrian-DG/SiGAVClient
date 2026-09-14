import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as Prod } from 'src/environment/environment.prod';
import { environment as Dev } from 'src/environment/environment';
import { IExcelUploadResponse } from '../../components/excel-upload/excel-upload.models';

@Injectable({
	providedIn: 'root',
})
export class UploadService {
	private readonly excelTemplateUrl: string;

	constructor(private http: HttpClient) {
		const env = isDevMode() ? Dev.api_url : Prod.api_url;
		this.excelTemplateUrl = `${env}/excel-template`;
	}

	/** Descarga la plantilla del tipo indicado. */
	downloadTemplate(templateType: string): Observable<Blob> {
		return this.http.get(`${this.excelTemplateUrl}/download/${templateType}`, {
			responseType: 'blob',
		});
	}

	/** Envia el archivo de Excel al endpoint del tipo indicado. */
	uploadExcel(
		templateType: string,
		file: File,
	): Observable<IExcelUploadResponse> {
		const formData = new FormData();
		formData.append('file', file, file.name);

		return this.http.post<IExcelUploadResponse>(
			`${this.excelTemplateUrl}/upload/${templateType}`,
			formData,
		);
	}
}

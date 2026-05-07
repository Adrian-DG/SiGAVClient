import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as Prod } from 'src/environment/environment.prod';
import { environment as Dev } from 'src/environment/environment';
import { IServerResponse } from '../../Responses/iserver-response';

export interface IUnidadDenominacionUploadResponse {
	success: boolean;
	message: string;
	processedCount: number;
}

@Injectable({
	providedIn: 'root',
})
export class UploadService {
	private readonly baseUrl: string;
	private readonly excelTemplateUrl: string;

	constructor(private http: HttpClient) {
		const env = isDevMode() ? Dev.api_url : Prod.api_url;
		this.baseUrl = `${env}/upload`;
		this.excelTemplateUrl = `${env}/excel-template`;
	}

	downloadUnidadDenominacionTemplate(): Observable<Blob> {
		return this.http.get(`${this.excelTemplateUrl}/download`, {
			responseType: 'blob',
		});
	}

	uploadUnidadDenominacion(
		file: File,
	): Observable<IUnidadDenominacionUploadResponse> {
		const formData = new FormData();
		formData.append('file', file, file.name);

		return this.http.post<IUnidadDenominacionUploadResponse>(
			`${this.excelTemplateUrl}/unidad-denominacion`,
			formData,
		);
	}
}

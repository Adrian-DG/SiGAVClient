import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as Prod } from 'src/environment/environment.prod';
import { environment as Dev } from 'src/environment/environment';
import { IServerResponse } from '../../Responses/iserver-response';

@Injectable({
	providedIn: 'root',
})
export class UploadService {
	private readonly baseUrl: string;

	constructor(private http: HttpClient) {
		const env = isDevMode() ? Dev.api_url : Prod.api_url;
		this.baseUrl = `${env}/upload`;
	}

	uploadUnidadesExcel(
		rows: Record<string, unknown>[],
	): Observable<IServerResponse> {
		return this.http.post<IServerResponse>(
			`${this.baseUrl}/unidades-excel`,
			{
				rows,
			},
		);
	}
}

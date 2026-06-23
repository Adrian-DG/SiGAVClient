import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/modules/generic/components/error-dialog/error-dialog.component';
import { IServerResponse } from 'src/app/modules/generic/Responses/iserver-response';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private _dialog: MatDialog) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler,
	): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			catchError((error: any) => {
				console.error('ErrorInterceptor:', error);
				this.showErrorDialog(error);
				return throwError(() => error);
			}),
		);
	}

	private showErrorDialog(error: any): void {
		let title = 'Error';
		let message = 'Se produjo un error inesperado.';
		let status = false;

		// Check if it's an Angular HttpErrorResponse wrapper
		if (error instanceof HttpErrorResponse) {
			// Extract the actual backend payload from the .error property
			const serverResponse = error.error as IServerResponse;

			if (serverResponse) {
				title = serverResponse.title || title;
				message = serverResponse.message || message;
				status = serverResponse.status ?? false;
			} else if (error.status === 0) {
				// Connection or CORS error (server is offline)
				message =
					'No se pudo conectar con el servidor. Verifique su conexión.';
			} else {
				// Fallback for raw status text if no JSON body was parsed
				message = error.message || message;
			}
		}

		this._dialog.open(ErrorDialogComponent, {
			width: '420px',
			disableClose: true,
			data: {
				title,
				message,
				status,
			},
		});
	}
}

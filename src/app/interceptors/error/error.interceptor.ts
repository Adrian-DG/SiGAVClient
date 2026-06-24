import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/modules/generic/components/error-dialog/error-dialog.component';
import { IServerResponse } from 'src/app/modules/generic/Responses/iserver-response';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	// Flag to track if an error modal is already on-screen
	private isDialogOpen = false;

	constructor(private _dialog: MatDialog) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler,
	): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			catchError((error: unknown) => {
				console.error('ErrorInterceptor:', error);

				// Only process actual HTTP errors
				if (error instanceof HttpErrorResponse) {
					this.showErrorDialog(error);
				}

				return throwError(() => error);
			}),
		);
	}

	private showErrorDialog(error: HttpErrorResponse): void {
		// Prevent dialog spam if one is already open
		if (this.isDialogOpen) {
			return;
		}

		let title = 'Error';
		let message = 'Se produjo un error inesperado.';
		let status = false;

		const serverResponse = error.error as IServerResponse | undefined;

		// Ensure serverResponse is actually an object and contains expected properties
		if (serverResponse && typeof serverResponse === 'object') {
			title = serverResponse.title || title;
			message = serverResponse.message || message;
			status = serverResponse.status ?? false;
		} else if (error.status === 0) {
			message =
				'No se pudo conectar con el servidor. Verifique su conexión.';
		} else {
			// Fallback to the Angular HttpErrorResponse message string if no body present
			message = error.message || message;
		}

		this.isDialogOpen = true;

		const dialogRef = this._dialog.open(ErrorDialogComponent, {
			width: '420px',
			disableClose: true,
			data: { title, message, status },
		});

		// Reset the flag once the user acknowledges and closes the modal
		dialogRef.afterClosed().subscribe(() => {
			this.isDialogOpen = false;
		});
	}
}

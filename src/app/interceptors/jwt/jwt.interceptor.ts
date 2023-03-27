import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(private $router: Router) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		let req = request;
		const bearerToken: string | null = sessionStorage?.getItem('token');

		if (bearerToken) {
			request = req.clone({
				setHeaders: { Authorization: `Bearer ${bearerToken}` },
			});
		}

		return next
			.handle(request)
			.pipe(
				catchError((error: HttpErrorResponse) => this.showError(error))
			);
	}

	showError(error: HttpErrorResponse) {
		if (error.status === 401) {
			this.$router.navigate(['/']);
		}

		return throwError(() => new Error('Invalid token'));
	}
}

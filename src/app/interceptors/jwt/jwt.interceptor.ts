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
	constructor(private router: Router) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler,
	): Observable<HttpEvent<unknown>> {
		const bearerToken = sessionStorage?.getItem('token');

		// 1. Cleaned up cloning logic
		if (bearerToken) {
			request = request.clone({
				setHeaders: { Authorization: `Bearer ${bearerToken}` },
			});
		}

		// 2. Explicitly return the catchError observable stream
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error.status === 401) {
					this.router.navigate(['/']);
				}

				// 3. Pass the original error through so components know what went wrong
				return throwError(() => error);
			}),
		);
	}
}

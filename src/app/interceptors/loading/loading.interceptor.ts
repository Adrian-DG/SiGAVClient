import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from 'src/app/modules/generic/services/spinner/spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
	constructor(private _spinner: SpinnerService) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		this._spinner.setLoading(true);
		return next.handle(request).pipe(
			finalize(() => {
				setTimeout(() => this._spinner.setLoading(false), 2000);
			})
		);
	}
}

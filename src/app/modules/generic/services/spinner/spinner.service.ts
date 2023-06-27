import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GenericService } from '../generic/generic.service';

@Injectable({
	providedIn: 'root',
})
export class SpinnerService {
	private _loadingSource: BehaviorSubject<boolean> = new BehaviorSubject(
		false
	);
	public isloading$: Observable<boolean> = this._loadingSource.asObservable();

	setLoading(value: boolean): void {
		this._loadingSource.next(value);
	}
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private _loadingSource: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loading$: Observable<boolean> = this._loadingSource.asObservable();

  constructor() { }

  setLoading(value: boolean) {
    this._loadingSource.next(value);
  }
}

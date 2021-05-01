import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alert } from '../../models/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private _alerts$ = new BehaviorSubject<Alert>(null);
  constructor() { }

  alert(alert: Alert) {
    this._alerts$.next(alert);
  }

  getAlerts() {
    return this._alerts$.asObservable();
  }
}



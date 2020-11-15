import { Component, OnInit } from '@angular/core';
import { concat, merge, pipe, Subject, timer } from 'rxjs';
import { concatMap, endWith, filter, map, skipLast, startWith, takeUntil, tap } from 'rxjs/operators';
import { Alert } from '../../models/alert';
import { AlertService } from '../../services/alert/alert.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  DEFAULT_ALERT_DURATION = 5000;
  DELAY_BETWEEN_ALERTS = 500;
  alerts$ = this.alertService.getAlerts().pipe(
    this.setUpAlertQueueing()
  );
  alertEnder$ = new Subject<number>();
  faTimes = faTimes;
  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }

  onClose(alert: Alert) {
    if (alert.closable) {
      this.alertEnder$.next(1);
    }
  }

  private setUpAlertQueueing() {
    return pipe(
      filter(alert => !!alert),
      this.ensureOptionalProperties(),
      concatMap((alert: Alert) => {
        const longLivingAlert$ = this.setAlert$(alert);
        const alertEnd$ = this.setAlertEnder$(alert);
        const ensureDelayAfter$ = this.ensureDelay(alert);
        const alert$ = merge(longLivingAlert$, alertEnd$).pipe(endWith(null));
        return concat(alert$, ensureDelayAfter$);
      })
    );
  }

  private ensureOptionalProperties() {
    return map((alert: Alert) => {
      alert.durationMs = alert.durationMs ? alert.durationMs : this.DEFAULT_ALERT_DURATION;
      alert.closable = alert.closable !== undefined ? alert.closable : true;
      return alert;
    });
  }

  private setAlert$(alert: Alert) {
    // Long living observalbe that will only emit the alert once.
    // Will be canceled by the takeUntil before timer emits value.
    const guaranteedOffset = 5000;
    return timer(alert.durationMs + guaranteedOffset).pipe(
      startWith(alert),
      takeUntil(this.alertEnder$.asObservable()),
    );
  }

  private setAlertEnder$(alert: Alert) {
    return timer(alert.durationMs).pipe(
      tap(() => this.alertEnder$.next(1)),
      // If user presses close button, we want to stop all observables controlling alert timing
      takeUntil(this.alertEnder$.asObservable()),
      skipLast(1)
    );
  }

  private ensureDelay(alert: Alert) {
    // This is used so there is a bit of delay between back to back alerts.
    return timer(this.DELAY_BETWEEN_ALERTS).pipe(
      skipLast(1)
    );
  }

}

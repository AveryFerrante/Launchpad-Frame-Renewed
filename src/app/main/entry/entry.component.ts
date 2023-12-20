import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Observer, PartialObserver, Subscription, combineLatest } from 'rxjs';
import { map, take, tap, withLatestFrom } from 'rxjs/operators';
import { RootSelectors, RootState } from 'src/app/root-store';
import { FrameStoreActions, FrameStoreSelectors } from 'src/app/root-store/frame-store';
import { ModalTypes } from 'src/app/root-store/frame-store/state';
import { URL_PATHS } from 'src/app/shared/models/constants/urlPathConstants';
import { UserFrameMetadata, User } from 'src/app/shared/models/firebase-collections/user';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit, OnDestroy {
  private user$: Observable<User> = this.store$.select(RootSelectors.SelectAuthenticationUser);
  private urlParamListenerSub: Subscription;
  frameDisplayState = { noFrames: false, badFrameId: false };
  constructor(private store$: Store<RootState>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.urlParamListenerSub = this.onUrlParamUpdate().subscribe()
  }

  ngOnDestroy(): void {
    this.urlParamListenerSub.unsubscribe();
  }

  openCreateFrame() {
    this.store$.dispatch(FrameStoreActions.UpdateActiveModal({ activeModal: ModalTypes.CreateFrameModal }));
  }

  openJoinFrame() {
    this.store$.dispatch(FrameStoreActions.UpdateActiveModal({ activeModal: ModalTypes.JoinFrameModal }));
  }

  private onUrlParamUpdate() {
    return this.route.params.pipe(
      withLatestFrom(this.user$),
      map(([params, user]) => ({ frameId: params['frameId'], userFrames: user.frames })),
      this.resolveActiveFrame()
    )
  }

  private resolveActiveFrame() {
    return tap(({ frameId, userFrames } : { frameId: string, userFrames: UserFrameMetadata[] }) => {
      if (!frameId) {
        this.resolveInitialFrame(userFrames);
      } else {
        this.resolveSelectedFrame(frameId, userFrames);
      }
    });
  }

  private resolveInitialFrame(userFrames: UserFrameMetadata[]) {
    if (userFrames.length > 0) {
      this.router.navigateByUrl(`${URL_PATHS.home}/${userFrames[0].frameId}`);
    } else {
      this.frameDisplayState = { noFrames: true, badFrameId: false };
    }
  }

  private resolveSelectedFrame(frameId: string, userFrames: UserFrameMetadata[]) {
    if (userFrames.find(f => f.frameId === frameId)) {
      this.store$.dispatch(FrameStoreActions.SelectFrame.Request({ request: frameId }));
      this.frameDisplayState = { noFrames: false, badFrameId: false };
    } else {
      this.frameDisplayState = { noFrames: false, badFrameId: true };
    }
  }

}

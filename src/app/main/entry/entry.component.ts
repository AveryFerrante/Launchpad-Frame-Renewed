import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Observer, PartialObserver } from 'rxjs';
import { map, take, tap, withLatestFrom } from 'rxjs/operators';
import { RootSelectors, RootState } from 'src/app/root-store';
import { FrameStoreActions, FrameStoreSelectors } from 'src/app/root-store/frame-store';
import { URL_PATHS } from 'src/app/shared/models/constants/urlPathConstants';
import { UserFrameMetadata, User } from 'src/app/shared/models/firebase-collections/user';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
  animations: [
    trigger(
      'fadeSlideInOut',
      [
        transition(
          ':enter',
          [
            style({ transform: 'translateX(-15%)', opacity: 0 }),
            animate('100ms ease-in', style({ transform: 'translateX(0%)', opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ transform: 'translateX(0%)', opacity: 1 }),
            animate('100ms ease-in', style({ transform: 'translateX(-15%)', opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class EntryComponent implements OnInit {
  user$: Observable<User> = this.store$.select(RootSelectors.SelectAuthenticationUser);
  selectedFrameId$ = this.setSelectedFrameIdListener();
  showCreateFrameModal = false;
  showJoinFrameModal = false;
  frameDisplayState = { noFrames: false, badFrameId: false };
  constructor(private store$: Store<RootState>, private route: ActivatedRoute, private router: Router) { }

  // TODO: Have Create/Join frame modals be controlled by application state. The modal components themselves can handle resource
  // creation & closing, etc.
  ngOnInit() {
    const frameId = this.route.snapshot.paramMap.get('frameId');
    if (!frameId) {
      this.selectInitialFrameIfAvailable();
    } else {
      this.selectFrameIfExists(frameId);
    }
  }

  onFrameSelect(frame: UserFrameMetadata) {
    this.closeSideNav();
    this.router.navigateByUrl(`${URL_PATHS.home}/${frame.frameId}`);
    this.selectFrame(frame.frameId);
  }

  selectFrameIfExists(frameId: string) {
    this.user$.pipe(
      take(1),
      this.determineIfFrameExists(frameId),
    ).subscribe();
  }

  determineIfFrameExists(frameId: string) {
    return tap((user: User) => {
      if (user.frames.find(f => f.frameId === frameId)) {
        this.selectFrame(frameId);
      } else {
        this.frameDisplayState = { noFrames: false, badFrameId: true };
      }
    });
  }

  selectFrame(frameId: string) {
    this.store$.dispatch(FrameStoreActions.SelectFrame.Request({ request: frameId }));
    this.frameDisplayState = { noFrames: false, badFrameId: false };
  }

  openCreateFrame() {
    this.showCreateFrameModal = true;
  }

  onCloseModal() {
    this.showCreateFrameModal = false;
    this.showJoinFrameModal = false;
  }

  onCreateFrame(frameName: string) {
    this.store$.dispatch(FrameStoreActions.NewFrame.Request({ request: frameName }));
    this.onCloseModal();
    this.closeSideNav();
  }

  openJoinFrame() {
    this.showJoinFrameModal = true;
  }

  onJoinFrame(accessKey: string) {
    this.store$.dispatch(FrameStoreActions.JoinFrame.Request({ request: accessKey }));
    this.onCloseModal();
    this.closeSideNav();
  }

  private selectInitialFrameIfAvailable() {
    // Will auto complete (due to take(1))
    this.user$.pipe(
      withLatestFrom(this.selectedFrameId$),
      tap(([user, selectedFrameId]) => {
        if (user.frames.length > 0 && !selectedFrameId) {
          this.onFrameSelect(user.frames[0]);
        } else {
          this.frameDisplayState = { noFrames: true, badFrameId: false };
        }
      }),
      take(1)
    ).subscribe();
  }

  private closeSideNav() {
    this.store$.dispatch(FrameStoreActions.UpdateSideNavVisibility({ visible: false }));
  }

  private setSelectedFrameIdListener() {
    return this.store$.select(FrameStoreSelectors.SelectSelectedFrame).pipe(
      map(frame => frame ? frame.id : '')
    );
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { RootState } from 'src/app/root-store';
import { FrameStoreActions, FrameStoreSelectors } from 'src/app/root-store/frame-store';
import { ModalTypes } from 'src/app/root-store/frame-store/state';

@Component({
  selector: 'main-join-frame',
  templateUrl: './join-frame.component.html',
  styleUrls: ['./join-frame.component.scss']
})
export class JoinFrameComponent implements OnInit {
  // TODO: USER CAN JOIN FRAME THEY ARE IN BY REPEATEDLY ENTERING ACCESS CODE. RESTRICT
  shouldDisplay$ = this.store$.select(FrameStoreSelectors.SelectActiveModal).pipe(map(m => m === ModalTypes.JoinFrameModal));
  errorText = '';
  constructor(private store$: Store<RootState>) { }

  ngOnInit() {
  }

  onCloseModal() {
    this.store$.dispatch(FrameStoreActions.UpdateActiveModal({ activeModal: ModalTypes.None }));
  }

  onCreateFrame(accessKey: string) {
    if (!accessKey || accessKey === '') {
      this.errorText = 'Must enter a value.';
    } else if (accessKey.length !== 6) {
      this.errorText = 'Value must have 6 characters/numbers.';
    } else {
      this.store$.dispatch(FrameStoreActions.JoinFrame.Request({ request: accessKey }));
    }
  }

}

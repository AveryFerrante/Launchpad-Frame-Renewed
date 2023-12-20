import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { RootState } from 'src/app/root-store';
import { FrameStoreActions, FrameStoreSelectors } from 'src/app/root-store/frame-store';
import { ModalTypes } from 'src/app/root-store/frame-store/state';


@Component({
  selector: 'main-create-frame',
  templateUrl: './create-frame.component.html',
  styleUrls: ['./create-frame.component.scss']
})
export class CreateFrameComponent implements OnInit {
  shouldDisplay$ = this.store$.select(FrameStoreSelectors.SelectActiveModal).pipe(map(m => m === ModalTypes.CreateFrameModal))
  errorText = '';
  constructor(private store$: Store<RootState>) { }

  ngOnInit() {
  }

  onCloseModal() {
    this.store$.dispatch(FrameStoreActions.UpdateActiveModal({ activeModal: ModalTypes.None }));
  }

  onCreateFrame(frameName: string) {
    if (!frameName || frameName === '') {
      this.errorText = 'Must enter a name.';
    } else {
      this.store$.dispatch(FrameStoreActions.NewFrame.Request({ request: frameName }));
      this.onCloseModal();
    }
  }

}

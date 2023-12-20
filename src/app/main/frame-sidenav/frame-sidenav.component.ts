import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store';
import { FrameStoreSelectors } from 'src/app/root-store/frame-store';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'main-frame-sidenav',
  templateUrl: './frame-sidenav.component.html',
  styleUrls: ['./frame-sidenav.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.2s ease-out', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.2s ease-out', style({ transform: 'translateX(-100%)' }))
      ]),
    ])
  ]
})
export class FrameSidenavComponent implements OnInit {
  showSidenav$ = this.store$.select(FrameStoreSelectors.SelectSideNavVisibility);
  constructor(private store$: Store<RootState>) { }

  ngOnInit() {
  }

}

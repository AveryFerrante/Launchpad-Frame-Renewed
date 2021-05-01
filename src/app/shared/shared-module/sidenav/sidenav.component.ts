import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store';
import { FrameStoreSelectors } from 'src/app/root-store/frame-store';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger(
      'slideInOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ transform: 'translateX(-100%)' }),
            animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ transform: 'translateX(0%)' }),
            animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))
          ]
        )
      ]
    )
  ]
})
export class SidenavComponent implements OnInit {
  showSidenav$ = this.store$.select(FrameStoreSelectors.SelectSideNavVisibility);
  constructor(private store$: Store<RootState>) { }

  ngOnInit() {
  }

}

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FrameSidenavComponent } from './frame-sidenav.component';

describe('FrameSidenavComponent', () => {
  let component: FrameSidenavComponent;
  let fixture: ComponentFixture<FrameSidenavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FrameSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

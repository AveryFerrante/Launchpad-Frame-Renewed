import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameSidenavContentComponent } from './frame-sidenav-content.component';

describe('FrameSidenavContentComponent', () => {
  let component: FrameSidenavContentComponent;
  let fixture: ComponentFixture<FrameSidenavContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameSidenavContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameSidenavContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

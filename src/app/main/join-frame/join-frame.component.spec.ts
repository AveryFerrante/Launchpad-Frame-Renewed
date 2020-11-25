import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinFrameComponent } from './join-frame.component';

describe('JoinFrameComponent', () => {
  let component: JoinFrameComponent;
  let fixture: ComponentFixture<JoinFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

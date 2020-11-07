import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFrameComponent } from './create-frame.component';

describe('CreateFrameComponent', () => {
  let component: CreateFrameComponent;
  let fixture: ComponentFixture<CreateFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

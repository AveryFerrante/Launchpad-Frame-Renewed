import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileImageUploadFabComponent } from './mobile-image-upload-fab.component';

describe('MobileImageUploadFabComponent', () => {
  let component: MobileImageUploadFabComponent;
  let fixture: ComponentFixture<MobileImageUploadFabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileImageUploadFabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileImageUploadFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

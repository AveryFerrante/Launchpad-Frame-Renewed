import { TestBed } from '@angular/core/testing';

import { BatchHelperService } from './batch-helper.service';

describe('BatchHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BatchHelperService = TestBed.get(BatchHelperService);
    expect(service).toBeTruthy();
  });
});

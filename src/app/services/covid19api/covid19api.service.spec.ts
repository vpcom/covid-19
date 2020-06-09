import { TestBed } from '@angular/core/testing';

import { Covid19apiService } from './covid19api.service';

describe('Covid19apiService', () => {
  let service: Covid19apiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Covid19apiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

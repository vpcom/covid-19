import { TestBed } from '@angular/core/testing';

import { JhuDataService } from './jhu-data.service';

describe('JhuDataService', () => {
  let service: JhuDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JhuDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

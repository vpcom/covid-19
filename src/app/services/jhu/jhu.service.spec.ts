import { TestBed } from '@angular/core/testing';

import { JhuService } from './jhu.service';

describe('JhuService', () => {
  let service: JhuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JhuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

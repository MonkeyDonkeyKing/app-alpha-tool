import { TestBed } from '@angular/core/testing';

import { CuratedService } from './curated.service';

describe('CuratedService', () => {
  let service: CuratedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuratedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

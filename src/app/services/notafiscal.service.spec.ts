import { TestBed } from '@angular/core/testing';

import { NotafiscalService } from './notafiscal.service';

describe('NotafiscalService', () => {
  let service: NotafiscalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotafiscalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

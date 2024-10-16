import { TestBed } from '@angular/core/testing';

import { FlightbookingstoreService } from './flightbookingstore.service';

describe('FlightbookingstoreService', () => {
  let service: FlightbookingstoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightbookingstoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

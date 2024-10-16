import { TestBed } from '@angular/core/testing';

import { HomeauthService } from './homeauth.service';

describe('HomeauthService', () => {
  let service: HomeauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

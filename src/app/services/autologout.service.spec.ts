import { TestBed } from '@angular/core/testing';

import { AutoLogoutService } from './autologout.service';

describe('AutoLogoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoLogoutService = TestBed.get(AutoLogoutService);
    expect(service).toBeTruthy();
  });
});

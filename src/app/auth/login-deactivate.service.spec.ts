import { TestBed } from '@angular/core/testing';

import { LoginDeactivateService } from './login-deactivate.service';

describe('LoginDeactivateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginDeactivateService = TestBed.get(LoginDeactivateService);
    expect(service).toBeTruthy();
  });
});

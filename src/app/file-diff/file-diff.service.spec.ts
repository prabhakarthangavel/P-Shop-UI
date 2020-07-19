import { TestBed } from '@angular/core/testing';

import { FileDiffService } from './file-diff.service';

describe('FileDiffService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileDiffService = TestBed.get(FileDiffService);
    expect(service).toBeTruthy();
  });
});

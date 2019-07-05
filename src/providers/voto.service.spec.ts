import { TestBed } from '@angular/core/testing';

import { VotoService } from './voto.service';

describe('VotoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VotoService = TestBed.get(VotoService);
    expect(service).toBeTruthy();
  });
});

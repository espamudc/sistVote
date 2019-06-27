import { TestBed } from '@angular/core/testing';

import { StandService } from './stand-service.service';

describe('StandService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StandService = TestBed.get(StandService);
    expect(service).toBeTruthy();
  });
});

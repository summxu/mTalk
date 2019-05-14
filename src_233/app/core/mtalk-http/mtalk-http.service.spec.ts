import { TestBed } from '@angular/core/testing';

import { MtalkHttpService } from './mtalk-http.service';

describe('MtalkHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MtalkHttpService = TestBed.get(MtalkHttpService);
    expect(service).toBeTruthy();
  });
});

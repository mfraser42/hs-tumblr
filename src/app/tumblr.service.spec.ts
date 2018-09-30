import { TestBed } from '@angular/core/testing';

import { TumblrService } from './tumblr.service';

describe('TumblrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TumblrService = TestBed.get(TumblrService);
    expect(service).toBeTruthy();
  });
});

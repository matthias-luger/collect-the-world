import { TestBed } from '@angular/core/testing';

import { TargetPhotoService } from './target-photo.service';

describe('TargetPhotoService', () => {
  let service: TargetPhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TargetPhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { UserwordService } from './userword.service';

describe('UserwordService', () => {
  let service: UserwordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserwordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

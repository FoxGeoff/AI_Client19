import { TestBed } from '@angular/core/testing';

import { BookTrackerErrorHandlerService } from './book-tracker-error-handler.service';

describe('BookTrackerErrorHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookTrackerErrorHandlerService = TestBed.get(BookTrackerErrorHandlerService);
    expect(service).toBeTruthy();
  });
});

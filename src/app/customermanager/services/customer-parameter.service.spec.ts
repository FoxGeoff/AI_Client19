import { TestBed } from '@angular/core/testing';

import { CustomerParameterService } from './customer-parameter.service';

describe('CustomerParameterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerParameterService = TestBed.get(CustomerParameterService);
    expect(service).toBeTruthy();
  });
});

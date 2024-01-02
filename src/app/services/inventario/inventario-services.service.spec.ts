import { TestBed } from '@angular/core/testing';

import { InventarioServicesService } from './inventario-services.service';

describe('InventarioServicesService', () => {
  let service: InventarioServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventarioServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

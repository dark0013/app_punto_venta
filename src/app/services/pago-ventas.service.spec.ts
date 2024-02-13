import { TestBed } from '@angular/core/testing';

import { PagoVentasService } from './pago-ventas.service';

describe('PagoVentasService', () => {
  let service: PagoVentasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagoVentasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

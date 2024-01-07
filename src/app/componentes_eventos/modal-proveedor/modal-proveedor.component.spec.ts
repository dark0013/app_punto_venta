import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProveedorComponent } from './modal-proveedor.component';

describe('ModalProveedorComponent', () => {
  let component: ModalProveedorComponent;
  let fixture: ComponentFixture<ModalProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalProveedorComponent]
    });
    fixture = TestBed.createComponent(ModalProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

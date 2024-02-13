import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PeriodicElement } from '../model/PeriodicElement.model';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private datosSubject: BehaviorSubject<PeriodicElement[]> = new BehaviorSubject<PeriodicElement[]>([]);
  tusDatos$: Observable<PeriodicElement[]> = this.datosSubject.asObservable();
  sumaTotal: number = 0;

  constructor() { }

  agregarElemento(nuevoElemento: any) {
    const datosActuales = this.datosSubject.value;
    this.datosSubject.next([...datosActuales, nuevoElemento]);

    this.sumaTotal += parseInt(nuevoElemento.symbol, 10);
  }

  obtenerSumaTotal() {
    return this.sumaTotal;
  }

  eliminarElementoPosicion(posicion: number) {
    const datosActuales = this.datosSubject.value;
    const elementoEliminado = datosActuales[posicion];
    this.sumaTotal -= elementoEliminado.precio_total;
    const nuevosDatos = datosActuales.filter((elemento, index) => index !== posicion);
    this.datosSubject.next([...nuevosDatos]);
  }
}

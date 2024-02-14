import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from 'src/app/model/PagoVenta.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagoVentasService {
  private url: string = `${environment.HOST}/api/pagoventas`;
  constructor(private http: HttpClient) { }

  savePagoVentas(venta: Venta) {
    return this.http.post(this.url, venta);
  }
}

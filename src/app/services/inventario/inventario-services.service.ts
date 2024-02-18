import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventario } from 'src/app/model/InventarioModel.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioServicesService {
  private url: string = `${environment.HOST}/api/inventario`;
  private url_inventarioventa: string = `${environment.HOST}/api/inventarioventa`;

  constructor(private http: HttpClient) { }

  getAllInventario() {
    return this.http.get<Inventario[]>(this.url);
  }
  getAllInventarioxCodigo(codigo:string) {
    return this.http.get<Inventario[]>(`${this.url_inventarioventa}/${codigo}`);
  }

  saveInventario(inventario: Inventario) {
    return this.http.post(this.url, inventario);
  }

  updateInventario(id: number, inventario: Inventario) {
    return this.http.put(`${this.url}/${id}`, inventario);
  }

  inactivarInventario(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }


}

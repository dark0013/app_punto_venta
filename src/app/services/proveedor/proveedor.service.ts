import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from 'src/app/model/ProveedoresModel.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private url: string = `${environment.HOST}/api/proveedor`;

  constructor(private http: HttpClient) { }

  getAllProveedor() {
    return this.http.get<Proveedor[]>(this.url);
  }

  saveProveedor(proveedor: Proveedor) {
    return this.http.post(this.url, proveedor);
  }

  updateProveedor(id: number, proveedor: Proveedor) {
    return this.http.put(`${this.url}/${id}`, proveedor);
  }

  inactivarProveedor(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
